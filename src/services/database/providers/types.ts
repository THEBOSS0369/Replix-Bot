import { Message, MessageInput } from '../../../types/message';
import { AgentConfig } from '../../../agent/types';

export interface KnowledgeResult {
  id: string;
  title: string;
  content: string;
}

export interface DatabaseProvider {
  saveMessage(input: MessageInput): Promise<Message>;
  getConversationHistory(sessionId: string, limit?: number): Promise<Message[]>;
  getUserProfile(userId: string): Promise<AgentConfig>;
  searchKnowledge(userId: string, query: string, limit?: number): Promise<KnowledgeResult[]>;
}

export type DatabaseProviderType = 'local' | 'supabase';
