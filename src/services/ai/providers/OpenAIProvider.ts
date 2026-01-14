import OpenAI from 'openai';
import { AIProvider, AIMessage, GenerateOptions } from './types';

export class OpenAIProvider implements AIProvider {
  private client: OpenAI;
  private model: string;

  constructor(apiKey: string, model: string = 'gpt-4o-mini') {
    this.client = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true,
    });
    this.model = model;
  }

  async generateResponse(
    messages: AIMessage[],
    systemPrompt: string,
    options?: GenerateOptions
  ): Promise<string> {
    try {
      // Convert messages to OpenAI format with system prompt
      const openaiMessages: OpenAI.ChatCompletionMessageParam[] = [
        { role: 'system', content: systemPrompt },
        ...messages.map((msg) => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        })),
      ];

      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: openaiMessages,
        temperature: options?.temperature ?? 1,
        max_tokens: options?.max_tokens ?? 1024,
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No content in OpenAI response');
      }

      return content;
    } catch (error) {
      if (error instanceof OpenAI.APIError) {
        throw new Error(`OpenAI API Error: ${error.message}`);
      }
      throw error;
    }
  }
}
