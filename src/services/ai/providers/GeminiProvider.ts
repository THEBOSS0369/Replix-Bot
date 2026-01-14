import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIProvider, AIMessage, GenerateOptions } from './types';

export class GeminiProvider implements AIProvider {
  private client: GoogleGenerativeAI;
  private model: string;

  constructor(apiKey: string, model: string = 'gemini-1.5-flash') {
    this.client = new GoogleGenerativeAI(apiKey);
    this.model = model;
  }

  async generateResponse(
    messages: AIMessage[],
    systemPrompt: string,
    options?: GenerateOptions
  ): Promise<string> {
    try {
      const model = this.client.getGenerativeModel({
        model: this.model,
        systemInstruction: systemPrompt,
        generationConfig: {
          temperature: options?.temperature ?? 1,
          maxOutputTokens: options?.max_tokens ?? 1024,
        },
      });

      // Convert messages to Gemini format
      const history = messages.slice(0, -1).map((msg) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      }));

      const chat = model.startChat({ history });

      // Get the last message (current user input)
      const lastMessage = messages[messages.length - 1];
      const result = await chat.sendMessage(lastMessage.content);
      const response = result.response;

      return response.text();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
      }
      throw error;
    }
  }
}
