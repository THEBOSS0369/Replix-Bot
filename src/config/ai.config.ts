import { AIProviderType } from '../services/ai/providers/types';

export interface AIConfig {
  provider: AIProviderType;
  gemini: {
    model: string;
  };
  openai: {
    model: string;
  };
  claude: {
    model: string;
  };
}

/**
 * AI Provider Configuration
 *
 * Change the 'provider' value to switch between AI providers:
 * - 'gemini' : Google Gemini (free tier available)
 * - 'openai' : OpenAI GPT models
 * - 'claude' : Anthropic Claude
 *
 * Make sure to set the corresponding API key in your .env.local file.
 */
export const AI_CONFIG: AIConfig = {
  // Change this to switch providers: 'gemini' | 'openai' | 'claude'
  provider: 'gemini',

  gemini: {
    model: 'gemini-flash-latest',
  },
  openai: {
    model: 'gpt-4o-mini',
  },
  claude: {
    model: 'claude-sonnet-4-20250514',
  },
};
