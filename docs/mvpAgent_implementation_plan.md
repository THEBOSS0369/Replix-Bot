# MVP Agent System - Implementation Plan

## 🎯 MVP Goals

**What we're building:**

- A functional AI customer support system
- Works across multiple channels (Web, Telegram)
- Smart enough to handle common queries
- Can escalate when needed
- NO leads tracking (comes later)
- NO complex tools (comes later)
- Focus: Get it working, learn, iterate

---

## 🤖 MVP Agent Architecture (Simplified)

### Single Agent Approach (for MVP)

Instead of 6 specialized agents, start with **ONE smart agent** that can handle everything:

**Universal Support Agent**

- Answers questions using knowledge base
- Handles support inquiries
- Can escalate to human when stuck
- Works across all channels
- Simple, reliable, effective

**Why start with one agent?**

- Faster to build and deploy
- Easier to test and debug
- Learn what users actually need
- Add specialized agents later based on real usage patterns

---

## 📐 MVP Project Structure

```
📁 Project Root
│
├── 📁 src/
│   │
│   ├── 📁 agent/                       # SINGLE AGENT SYSTEM
│   │   ├── Agent.ts                    # Main agent class
│   │   ├── prompt.ts                   # Agent system prompt
│   │   └── types.ts                    # Type definitions
│   │
│   ├── 📁 channels/                    # COMMUNICATION CHANNELS (we set this later)
│   │   ├── web/
│   │   │   ├── ChatInterface.tsx       # React chat UI
│   │   │   └── WebChannel.ts           # Web channel handler
│   │   └── telegram/
│   │       └── TelegramChannel.ts      # Telegram channel handler
│   │
│   ├── 📁 services/                    # CORE SERVICES
│   │   ├── ai/
│   │   │   └── AIService.ts            # AI provider (Claude API)
│   │   ├── database/
│   │   │   └── DatabaseService.ts      # Supabase database operations
│   │   └── knowledge/
│   │       └── KnowledgeService.ts     # Simple KB search
│   │
│   └── 📁 types/                       # SHARED TYPES
│       ├── message.ts                  # Message types
│       └── conversation.ts             # Conversation types
│
└── 📁 supabase/
    ├── 📁 functions/                   # EDGE FUNCTIONS (Thin API layer)
    │   ├── chat/                       # Web chat endpoint
    │   │   └── index.ts
    │   └── telegram-webhook/           # Telegram endpoint
    │       └── index.ts
    │
    └── 📁 migrations/                  # DATABASE
        └── 001_create_conversations.sql
```

---

## 🗄️ MVP Database Schema (Minimal)

### Tables Needed:

#### 1. conversations

```sql
CREATE TABLE conversations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id text NOT NULL,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  source text NOT NULL CHECK (source IN ('web', 'telegram', 'whatsapp')),
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now()
);

CREATE INDEX idx_conversations_session ON conversations(session_id);
CREATE INDEX idx_conversations_user ON conversations(user_id);
CREATE INDEX idx_conversations_created ON conversations(created_at DESC);
```

#### 2. knowledge_base

```sql
CREATE TABLE knowledge_base (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  embedding vector(1536), -- for future semantic search
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE INDEX idx_knowledge_user ON knowledge_base(user_id);
```

#### 3. profiles (extend existing or create)

```sql
-- If doesn't exist, create:
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  brand_tone text DEFAULT 'friendly' CHECK (brand_tone IN ('friendly', 'professional', 'casual')),
  company_name text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- If exists, just add columns:
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS brand_tone text DEFAULT 'friendly';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS company_name text;
```

---

## 🔄 MVP Flow Diagrams

### Web Chat Flow

```
┌─────────────────────────────────────────────────────────────┐
│                         USER                                 │
│                     (types message)                          │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   ChatInterface.tsx                          │
│            (React component captures message)                │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    WebChannel.ts                             │
│         (sends to backend via Supabase function)             │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│           supabase/functions/chat/index.ts                   │
│                  (Edge Function - API)                       │
│                                                              │
│  1. Authenticate user                                        │
│  2. Get session_id                                           │
│  3. Save user message to DB                                  │
│  4. Call Agent.process(message)                              │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                     Agent.ts                                 │
│              (Main agent orchestration)                      │
│                                                              │
│  1. Load conversation history                                │
│  2. Build system prompt (with brand tone)                    │
│  3. Search knowledge base (if needed)                        │
│  4. Call AIService with context                              │
│  5. Get AI response                                          │
│  6. Save response to DB                                      │
│  7. Return to API                                            │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              Back through Edge Function                      │
│                 Back to WebChannel                           │
│              Back to ChatInterface                           │
│                 Display to USER                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🏗️ Phase 1: Core Agent - DETAILED TASKS

### Overview

Build the core agent that can:

- Receive messages
- Process with AI
- Return responses
- Save to database

### Task Breakdown

---

### TASK 1.1: Create Type Definitions (30 minutes)

**File:** `src/types/message.ts`

**What to create:**

```typescript
export interface Message {
  id?: string;
  session_id: string;
  user_id: string;
  role: 'user' | 'assistant';
  content: string;
  source: 'web' | 'telegram' | 'whatsapp';
  metadata?: Record<string, any>;
  created_at?: Date;
}

export interface MessageInput {
  content: string;
  session_id: string;
  user_id: string;
  source: 'web' | 'telegram' | 'whatsapp';
  metadata?: Record<string, any>;
}
```

**File:** `src/types/conversation.ts`

**What to create:**

```typescript
export interface Conversation {
  session_id: string;
  messages: Message[];
  user_id: string;
  started_at: Date;
  last_message_at: Date;
}

export interface ConversationHistory {
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}
```

**File:** `src/agent/types.ts`

**What to create:**

```typescript
import { Message } from '../types/message';

export interface AgentConfig {
  brand_tone: 'friendly' | 'professional' | 'casual';
  company_name: string;
  max_history_messages?: number; // default 20
}

export interface AgentResponse {
  message: string;
  session_id: string;
  metadata?: {
    kb_used: boolean;
    kb_articles?: string[];
  };
}

export interface KnowledgeResult {
  id: string;
  title: string;
  content: string;
  relevance_score?: number;
}
```

**Testing:**

- Import types in another file, verify no errors
- TypeScript compilation passes

---

### TASK 1.2: Create Database Service (2 hours)

**File:** `src/services/database/DatabaseService.ts`

**What to create:**

```typescript
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Message, MessageInput } from '../../types/message';
import { AgentConfig } from '../../agent/types';

export class DatabaseService {
  private supabase: SupabaseClient;

  constructor(supabaseUrl: string, supabaseKey: string) {
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  /**
   * Save a message to the database
   */
  async saveMessage(messageInput: MessageInput): Promise<Message> {
    const { data, error } = await this.supabase
      .from('conversations')
      .insert({
        session_id: messageInput.session_id,
        user_id: messageInput.user_id,
        role: messageInput.role,
        content: messageInput.content,
        source: messageInput.source,
        metadata: messageInput.metadata || {},
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to save message: ${error.message}`);
    }

    return data;
  }

  /**
   * Get conversation history for a session
   */
  async getConversationHistory(
    session_id: string,
    limit: number = 20
  ): Promise<Message[]> {
    const { data, error } = await this.supabase
      .from('conversations')
      .select('*')
      .eq('session_id', session_id)
      .order('created_at', { ascending: true })
      .limit(limit);

    if (error) {
      throw new Error(`Failed to get conversation: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Get user profile with brand settings
   */
  async getUserProfile(user_id: string): Promise<AgentConfig> {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('brand_tone, company_name')
      .eq('id', user_id)
      .single();

    if (error) {
      // Return defaults if profile doesn't exist
      return {
        brand_tone: 'friendly',
        company_name: 'Our Company',
      };
    }

    return {
      brand_tone: data.brand_tone || 'friendly',
      company_name: data.company_name || 'Our Company',
    };
  }

  /**
   * Search knowledge base (simple keyword search for MVP)
   */
  async searchKnowledge(
    user_id: string,
    query: string,
    limit: number = 5
  ): Promise<Array<{ id: string; title: string; content: string }>> {
    // Simple keyword search using PostgreSQL full-text search
    const { data, error } = await this.supabase
      .from('knowledge_base')
      .select('id, title, content')
      .eq('user_id', user_id)
      .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
      .limit(limit);

    if (error) {
      console.error('Knowledge search error:', error);
      return [];
    }

    return data || [];
  }
}
```

**Environment Setup:**

Create `.env.local` (if not exists):

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Testing:**

- Create test script: `src/services/database/__tests__/DatabaseService.test.ts`
- Test saving a message
- Test retrieving messages
- Test getting user profile
- Verify data appears in Supabase dashboard

---

### TASK 1.3: Create AI Service (1.5 hours)

**File:** `src/services/ai/AIService.ts`

**What to create:**

```typescript
import Anthropic from '@anthropic-ai/sdk';

export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
}

export class AIService {
  private client: Anthropic;

  constructor(apiKey: string) {
    this.client = new Anthropic({
      apiKey: apiKey,
    });
  }

  /**
   * Call Claude API with messages and system prompt
   */
  async generateResponse(
    messages: AIMessage[],
    systemPrompt: string,
    options?: {
      temperature?: number;
      max_tokens?: number;
    }
  ): Promise<string> {
    try {
      const response = await this.client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: options?.max_tokens || 1024,
        temperature: options?.temperature || 1,
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
        throw new Error('No text content in response');
      }

      return textContent.text;
    } catch (error) {
      if (error instanceof Anthropic.APIError) {
        throw new Error(`AI API Error: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Stream response (for future enhancement)
   */
  async streamResponse(
    messages: AIMessage[],
    systemPrompt: string,
    onChunk: (text: string) => void
  ): Promise<void> {
    const stream = await this.client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      temperature: 1,
      system: systemPrompt,
      messages: messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      stream: true,
    });

    for await (const event of stream) {
      if (
        event.type === 'content_block_delta' &&
        event.delta.type === 'text_delta'
      ) {
        onChunk(event.delta.text);
      }
    }
  }
}
```

**Environment Setup:**

Add to `.env.local`:

```
ANTHROPIC_API_KEY=your_anthropic_api_key
```

**Testing:**

- Create simple test script
- Send a test message: "Hello, how are you?"
- Verify you get a response
- Check for errors

---

### TASK 1.4: Create Knowledge Service (1 hour)

**File:** `src/services/knowledge/KnowledgeService.ts`

**What to create:**

```typescript
import { DatabaseService } from '../database/DatabaseService';
import { KnowledgeResult } from '../../agent/types';

export class KnowledgeService {
  constructor(private dbService: DatabaseService) {}

  /**
   * Search knowledge base for relevant articles
   */
  async search(
    user_id: string,
    query: string,
    limit: number = 3
  ): Promise<KnowledgeResult[]> {
    // For MVP, use simple database search
    const results = await this.dbService.searchKnowledge(user_id, query, limit);

    // Convert to KnowledgeResult format
    return results.map((r) => ({
      id: r.id,
      title: r.title,
      content: r.content,
      relevance_score: 1.0, // Simple - no scoring yet
    }));
  }

  /**
   * Extract keywords from query (simple implementation)
   */
  private extractKeywords(query: string): string[] {
    // Remove common words
    const stopWords = new Set([
      'the',
      'a',
      'an',
      'and',
      'or',
      'but',
      'in',
      'on',
      'at',
      'to',
      'for',
      'of',
      'with',
      'by',
      'from',
      'how',
      'what',
      'when',
      'where',
      'who',
      'why',
      'is',
      'are',
      'was',
      'were',
    ]);

    return query
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length > 2 && !stopWords.has(word));
  }

  /**
   * Check if query should trigger KB search
   */
  shouldSearchKnowledge(query: string): boolean {
    const questionWords = ['how', 'what', 'when', 'where', 'why', 'can'];
    const lowerQuery = query.toLowerCase();

    // Search if it's a question or if it mentions specific keywords
    return (
      questionWords.some((word) => lowerQuery.includes(word)) ||
      query.includes('?')
    );
  }
}
```

**Testing:**

- Test with sample queries
- Verify it returns relevant results
- Test edge cases (empty query, very long query)

---

### TASK 1.5: Create Agent Prompt (1 hour)

**File:** `src/agent/prompt.ts`

**What to create:**

```typescript
import { AgentConfig, KnowledgeResult } from './types';

/**
 * Build the main system prompt for the agent
 */
export function buildSystemPrompt(
  config: AgentConfig,
  knowledgeResults?: KnowledgeResult[]
): string {
  const basePrompt = `# IDENTITY
You are an AI customer support agent for ${
    config.company_name
  }. You are helpful, 
knowledgeable, and focused on solving customer problems quickly.

# YOUR CAPABILITIES
1. Answer questions using the knowledge base
2. Help with common issues and how-to questions
3. Provide information about products and features
4. Escalate complex issues to human support when needed

# BEHAVIORAL GUIDELINES

## Tone
${getBrandToneInstructions(config.brand_tone)}

## Response Style
- Be concise but complete
- Use natural, conversational language
- Break complex answers into steps
- Ask clarifying questions when needed
- Never make up information

## When to Use Knowledge Base
If knowledge base content is provided below:
1. Use that information to answer the question
2. Cite the article title when relevant
3. If multiple articles are relevant, mention them
4. If no relevant info found, say "I don't have specific information about that"

## When to Escalate
Escalate to human support when:
- You don't have the information needed
- User is frustrated or angry
- Issue requires account access or sensitive operations
- User explicitly asks for human help
- After 3 failed attempts to resolve an issue

To escalate, say: "Let me connect you with our support team who can help with this."

## What NOT to Do
- Don't make up answers
- Don't promise things you can't deliver
- Don't access or modify user accounts
- Don't share sensitive information
- Don't engage with abusive users (politely end conversation)

${addKnowledgeContext(knowledgeResults)}

---

Now respond to the user's message naturally and helpfully.`;

  return basePrompt;
}

/**
 * Get brand tone specific instructions
 */
function getBrandToneInstructions(tone: AgentConfig['brand_tone']): string {
  switch (tone) {
    case 'friendly':
      return `- Warm and approachable
- Use casual language
- Can use light emoji (but don't overdo it)
- Empathetic and personal
Example: "Hey! I'd be happy to help with that 😊"`;

    case 'professional':
      return `- Respectful and polished
- Use clear, professional language
- Minimal emoji
- Courteous and efficient
Example: "I'd be glad to assist you with that."`;

    case 'casual':
      return `- Relaxed and conversational
- Use everyday language
- Friendly and laid-back
- Like talking to a knowledgeable friend
Example: "No problem! Let's get that sorted for you."`;

    default:
      return `- Balanced and natural
- Clear and helpful
- Friendly but professional
Example: "I can help you with that!"`;
  }
}

/**
 * Add knowledge base context to prompt
 */
function addKnowledgeContext(results?: KnowledgeResult[]): string {
  if (!results || results.length === 0) {
    return '# KNOWLEDGE BASE\nNo relevant articles found for this query.';
  }

  const articlesText = results
    .map(
      (article, index) => `
## Article ${index + 1}: ${article.title}

${article.content}

---`
    )
    .join('\n');

  return `# KNOWLEDGE BASE

The following articles may be relevant to the user's question. Use them to provide accurate answers:

${articlesText}`;
}

/**
 * Get temperature based on brand tone
 */
export function getTemperature(brandTone: AgentConfig['brand_tone']): number {
  switch (brandTone) {
    case 'professional':
      return 0.7; // More focused
    case 'casual':
      return 1.0; // More creative
    case 'friendly':
    default:
      return 0.85; // Balanced
  }
}
```

**Testing:**

- Generate prompts with different tones
- Verify output looks correct
- Check knowledge base context formatting

---

### TASK 1.6: Create Main Agent Class (2 hours)

**File:** `src/agent/Agent.ts`

**What to create:**

```typescript
import { AIService } from '../services/ai/AIService';
import { DatabaseService } from '../services/database/DatabaseService';
import { KnowledgeService } from '../services/knowledge/KnowledgeService';
import { Message } from '../types/message';
import { AgentResponse, AgentConfig } from './types';
import { buildSystemPrompt, getTemperature } from './prompt';

export class Agent {
  private aiService: AIService;
  private dbService: DatabaseService;
  private knowledgeService: KnowledgeService;

  constructor(
    aiService: AIService,
    dbService: DatabaseService,
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
    try {
      // 1. Save user message to database
      await this.dbService.saveMessage({
        content: message,
        session_id: sessionId,
        user_id: userId,
        role: 'user',
        source: source,
      });

      // 2. Load conversation history
      const history = await this.dbService.getConversationHistory(
        sessionId,
        20 // last 20 messages
      );

      // 3. Get user profile and brand settings
      const config = await this.dbService.getUserProfile(userId);

      // 4. Search knowledge base if query warrants it
      const shouldSearch = this.knowledgeService.shouldSearchKnowledge(message);
      const kbResults = shouldSearch
        ? await this.knowledgeService.search(userId, message, 3)
        : [];

      // 5. Build system prompt with KB context
      const systemPrompt = buildSystemPrompt(config, kbResults);

      // 6. Convert history to AI message format
      const aiMessages = history.map((msg) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      }));

      // 7. Call AI service
      const aiResponse = await this.aiService.generateResponse(
        aiMessages,
        systemPrompt,
        {
          temperature: getTemperature(config.brand_tone),
          max_tokens: 1024,
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
          kb_articles: kbResults.map((r) => r.title),
        },
      });

      // 9. Return response
      return {
        message: aiResponse,
        session_id: sessionId,
        metadata: {
          kb_used: kbResults.length > 0,
          kb_articles: kbResults.map((r) => r.title),
        },
      };
    } catch (error) {
      console.error('Agent processing error:', error);

      // Return friendly error message
      return {
        message: this.getErrorMessage(config?.brand_tone || 'friendly'),
        session_id: sessionId,
        metadata: {
          kb_used: false,
          error: true,
        },
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
        return 'Oops! Something went wrong on my end. Mind trying that again?';
      case 'friendly':
      default:
        return 'Sorry! I ran into a small issue. Could you please try sending that message again? 😊';
    }
  }
}
```

**Testing:**

- Create test script that runs the full flow
- Send test message
- Verify response is saved to DB
- Check KB search works
- Test error handling

---

### TASK 1.7: Create Integration Script (30 minutes)

**File:** `src/agent/index.ts`

**What to create:**

```typescript
import { Agent } from './Agent';
import { AIService } from '../services/ai/AIService';
import { DatabaseService } from '../services/database/DatabaseService';
import { KnowledgeService } from '../services/knowledge/KnowledgeService';

/**
 * Factory function to create configured agent instance
 */
export function createAgent(): Agent {
  // Get environment variables
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!anthropicKey) {
    throw new Error('ANTHROPIC_API_KEY not found in environment');
  }

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase credentials not found in environment');
  }

  // Create service instances
  const aiService = new AIService(anthropicKey);
  const dbService = new DatabaseService(supabaseUrl, supabaseKey);
  const knowledgeService = new KnowledgeService(dbService);

  // Create and return agent
  return new Agent(aiService, dbService, knowledgeService);
}

// Re-export types
export * from './types';
export { Agent } from './Agent';
```

---

### TASK 1.8: Create Test Script (30 minutes)

**File:** `scripts/test-agent.ts`

**What to create:**

```typescript
import { createAgent } from '../src/agent';
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function testAgent() {
  console.log('🧪 Testing Agent...\n');

  try {
    // Create agent
    const agent = createAgent();
    console.log('✅ Agent created successfully\n');

    // Test parameters
    const testUserId = 'YOUR_TEST_USER_ID'; // Replace with real user ID
    const sessionId = uuidv4();

    console.log(`Session ID: ${sessionId}\n`);

    // Test 1: Simple greeting
    console.log('Test 1: Simple greeting');
    console.log('User: Hello!');

    const response1 = await agent.process(
      'Hello!',
      sessionId,
      testUserId,
      'web'
    );

    console.log(`Agent: ${response1.message}\n`);

    // Test 2: Question that might need KB
    console.log('Test 2: Question');
    console.log('User: How do I reset my password?');

    const response2 = await agent.process(
      'How do I reset my password?',
      sessionId,
      testUserId,
      'web'
    );

    console.log(`Agent: ${response2.message}`);
    console.log(`KB Used: ${response2.metadata?.kb_used}\n`);

    // Test 3: Follow-up
    console.log('Test 3: Follow-up');
    console.log('User: Can you explain that again?');

    const response3 = await agent.process(
      'Can you explain that again?',
      sessionId,
      testUserId,
      'web'
    );

    console.log(`Agent: ${response3.message}\n`);

    console.log('✅ All tests completed!');
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

// Run tests
testAgent();
```

**To run:**

```bash
npx ts-node scripts/test-agent.ts
```

---

### TASK 1.9: Package.json Scripts (15 minutes)

**File:** `package.json`

**Add these scripts:**

```json
{
  "scripts": {
    "test:agent": "ts-node scripts/test-agent.ts",
    "dev:agent": "ts-node --watch src/agent/index.ts"
  }
}
```

**Install dependencies:**

```bash
npm install @anthropic-ai/sdk @supabase/supabase-js uuid dotenv
npm install -D @types/uuid @types/node ts-node
```

---

## ✅ Phase 1 Implementation Plan completed
