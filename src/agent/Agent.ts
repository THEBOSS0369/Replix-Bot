import { AIProvider } from '../services/ai/AIService';
import { DatabaseProvider } from '../services/database/DatabaseService';
import { KnowledgeService } from '../services/knowledge/KnowledgeService';
import { AgentResponse, AgentConfig } from './types';
import { buildSystemPrompt, getTemperature } from './prompt';

export class Agent {
  private aiService: AIProvider;
  private dbService: DatabaseProvider;
  private knowledgeService: KnowledgeService;

  constructor(
    aiService: AIProvider,
    dbService: DatabaseProvider,
    knowledgeService: KnowledgeService
  ) {
    this.aiService = aiService;
    this.dbService = dbService;
    this.knowledgeService = knowledgeService;
  }

  /**
   * Process a user message and generate response
   */
  async process(
    message: string,
    sessionId: string,
    userId: string,
    source: 'web' | 'telegram' = 'web'
  ): Promise<AgentResponse> {
    let config: AgentConfig | undefined;
    
    try {
      // 1. Save user message to database
      await this.dbService.saveMessage({
        content: message,
        session_id: sessionId,
        user_id: userId,
        role: 'user',
        source: source
      });

      // 2. Load conversation history
      const history = await this.dbService.getConversationHistory(
        sessionId,
        20 // last 20 messages
      );

      // 3. Get user profile and brand settings
      config = await this.dbService.getUserProfile(userId);

      // 4. Search knowledge base if query warrants it
      const shouldSearch = this.knowledgeService.shouldSearchKnowledge(message);
      const kbResults = shouldSearch
        ? await this.knowledgeService.search(userId, message, 3)
        : [];

      // 5. Build system prompt with KB context
      const systemPrompt = buildSystemPrompt(config, kbResults);

      // 6. Convert history to AI message format
      const aiMessages = history.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      }));

      // 7. Call AI service
      const aiResponse = await this.aiService.generateResponse(
        aiMessages,
        systemPrompt,
        {
          temperature: getTemperature(config.brand_tone),
          max_tokens: 1024
        }
      );

      // 8. Save AI response to database
      await this.dbService.saveMessage({
        content: aiResponse,
        session_id: sessionId,
        user_id: userId,
        role: 'assistant',
        source: source,
        metadata: {
          kb_used: kbResults.length > 0,
          kb_articles: kbResults.map(r => r.title)
        }
      });

      // 9. Return response
      return {
        message: aiResponse,
        session_id: sessionId,
        metadata: {
          kb_used: kbResults.length > 0,
          kb_articles: kbResults.map(r => r.title)
        }
      };
    } catch (error) {
      console.error('Agent processing error:', error);
      
      // Return friendly error message
      return {
        message: this.getErrorMessage(config?.brand_tone || 'friendly'),
        session_id: sessionId,
        metadata: {
          kb_used: false,
          error: true
        }
      };
    }
  }

  /**
   * Get error message based on brand tone
   */
  private getErrorMessage(brandTone: AgentConfig['brand_tone']): string {
    switch (brandTone) {
      case 'professional':
        return "I apologize, but I'm experiencing technical difficulties at the moment. Please try again shortly.";
      case 'casual':
        return "Oops! Something went wrong on my end. Mind trying that again?";
      case 'friendly':
      default:
        return "Sorry! I ran into a small issue. Could you please try sending that message again? 😊";
    }
  }
}
