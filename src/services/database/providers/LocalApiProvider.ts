import { Message, MessageInput } from '../../../types/message';
import { AgentConfig } from '../../../agent/types';
import { DatabaseProvider, KnowledgeResult } from './types';

/**
 * Browser-compatible provider that calls the local API server
 * Use this when running with local PostgreSQL
 */
export class LocalApiProvider implements DatabaseProvider {
  private baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  async saveMessage(messageInput: MessageInput): Promise<Message> {
    const response = await fetch(`${this.baseUrl}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messageInput),
    });

    if (!response.ok) {
      throw new Error('Failed to save message');
    }

    return response.json();
  }

  async getConversationHistory(
    sessionId: string,
    limit: number = 20
  ): Promise<Message[]> {
    const response = await fetch(
      `${this.baseUrl}/conversations/${sessionId}?limit=${limit}`
    );

    if (!response.ok) {
      throw new Error('Failed to get conversation');
    }

    return response.json();
  }

  async getUserProfile(userId: string): Promise<AgentConfig> {
    const response = await fetch(`${this.baseUrl}/profiles/${userId}`);

    if (!response.ok) {
      return { brand_tone: 'friendly', company_name: 'Our Company' };
    }

    return response.json();
  }

  async searchKnowledge(
    userId: string,
    query: string,
    limit: number = 5
  ): Promise<KnowledgeResult[]> {
    const response = await fetch(
      `${this.baseUrl}/knowledge/${userId}?q=${encodeURIComponent(query)}&limit=${limit}`
    );

    if (!response.ok) {
      return [];
    }

    return response.json();
  }
}
