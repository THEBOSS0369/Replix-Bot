import Anthropic from '@anthropic-ai/sdk';
import { AIProvider, AIMessage, GenerateOptions } from './types';

export class ClaudeProvider implements AIProvider {
  private client: Anthropic;
  private model: string;

  constructor(apiKey: string, model: string = 'claude-sonnet-4-20250514') {
    this.client = new Anthropic({
      apiKey: apiKey,
    });
    this.model = model;
  }

  async generateResponse(
    messages: AIMessage[],
    systemPrompt: string,
    options?: GenerateOptions
  ): Promise<string> {
    try {
      const response = await this.client.messages.create({
        model: this.model,
        max_tokens: options?.max_tokens ?? 1024,
        temperature: options?.temperature ?? 1,
        system: systemPrompt,
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      });

      // Extract text from response
      const textContent = response.content.find(
        (block) => block.type === 'text'
      );

      if (!textContent || textContent.type !== 'text') {
        throw new Error('No text content in Claude response');
      }

      return textContent.text;
    } catch (error) {
      if (error instanceof Anthropic.APIError) {
        throw new Error(`Claude API Error: ${error.message}`);
      }
      throw error;
    }
  }
}
