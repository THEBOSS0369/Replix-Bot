import { Agent } from './Agent';
import { createAIProvider, getConfiguredProvider } from '../services/ai/AIService';
import {
  createDatabaseProvider,
  getConfiguredDatabaseProvider,
} from '../services/database/DatabaseService';
import { KnowledgeService } from '../services/knowledge/KnowledgeService';

/**
 * Helper to get environment variable (works in both Vite and Node.js)
 */
function getEnv(key: string): string | undefined {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || process.env[`VITE_${key}`];
  }
  // @ts-ignore - Vite specific
  return import.meta.env?.[`VITE_${key}`] || import.meta.env?.[key];
}

/**
 * Factory function to create configured agent instance
 */
export function createAgent(): Agent {
  // Get API keys for AI providers
  const geminiKey = getEnv('GEMINI_API_KEY');
  const openaiKey = getEnv('OPENAI_API_KEY');
  const claudeKey = getEnv('ANTHROPIC_API_KEY');

  // Get Supabase credentials (only needed if using Supabase)
  const supabaseUrl = getEnv('SUPABASE_URL');
  const supabaseKey = getEnv('SUPABASE_ANON_KEY');

  // Create AI provider based on config
  const aiService = createAIProvider({
    geminiKey,
    openaiKey,
    claudeKey,
  });

  // Create database provider based on config
  const dbService = createDatabaseProvider({
    supabaseUrl,
    supabaseKey,
  });

  console.log(`[Agent] Using AI provider: ${getConfiguredProvider()}`);
  console.log(`[Agent] Using database: ${getConfiguredDatabaseProvider()}`);

  // Create knowledge service
  const knowledgeService = new KnowledgeService(dbService);

  // Create and return agent
  return new Agent(aiService, dbService, knowledgeService);
}

// Re-export types
export * from './types';
export { Agent } from './Agent';
