export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface GenerateOptions {
  temperature?: number;
  max_tokens?: number;
}

export interface AIProvider {
  generateResponse(
    messages: AIMessage[],
    systemPrompt: string,
    options?: GenerateOptions
  ): Promise<string>;
}

export type AIProviderType = 'gemini' | 'openai' | 'claude';
