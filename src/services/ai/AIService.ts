import { AI_CONFIG } from '../../config/ai.config';
import {
  AIProvider,
  AIProviderType,
  GeminiProvider,
  OpenAIProvider,
  ClaudeProvider,
} from './providers';

// Re-export types for backward compatibility
export type { AIMessage, AIProvider, GenerateOptions } from './providers';

export interface AIServiceConfig {
  geminiKey?: string;
  openaiKey?: string;
  claudeKey?: string;
}

/**
 * Creates an AI provider based on the configuration in ai.config.ts
 *
 * @param keys - Object containing API keys for different providers
 * @returns Configured AI provider instance
 * @throws Error if the required API key for the configured provider is missing
 */
export function createAIProvider(keys: AIServiceConfig): AIProvider {
  const provider = AI_CONFIG.provider;

  switch (provider) {
    case 'gemini': {
      if (!keys.geminiKey) {
        throw new Error(
          'GEMINI_API_KEY not found. Set VITE_GEMINI_API_KEY in your .env.local file.'
        );
      }
      return new GeminiProvider(keys.geminiKey, AI_CONFIG.gemini.model);
    }

    case 'openai': {
      if (!keys.openaiKey) {
        throw new Error(
          'OPENAI_API_KEY not found. Set VITE_OPENAI_API_KEY in your .env.local file.'
        );
      }
      return new OpenAIProvider(keys.openaiKey, AI_CONFIG.openai.model);
    }

    case 'claude': {
      if (!keys.claudeKey) {
        throw new Error(
          'ANTHROPIC_API_KEY not found. Set VITE_ANTHROPIC_API_KEY in your .env.local file.'
        );
      }
      return new ClaudeProvider(keys.claudeKey, AI_CONFIG.claude.model);
    }

    default: {
      const exhaustiveCheck: never = provider;
      throw new Error(`Unknown AI provider: ${exhaustiveCheck}`);
    }
  }
}

/**
 * Get the currently configured provider type
 */
export function getConfiguredProvider(): AIProviderType {
  return AI_CONFIG.provider;
}
