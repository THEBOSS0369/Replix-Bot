import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Message, MessageInput } from '../../../types/message';
import { AgentConfig } from '../../../agent/types';
import { DatabaseProvider, KnowledgeResult } from './types';

export class SupabaseProvider implements DatabaseProvider {
  private supabase: SupabaseClient;

  constructor(supabaseUrl: string, supabaseKey: string) {
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

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

  async getConversationHistory(
    sessionId: string,
    limit: number = 20
  ): Promise<Message[]> {
    const { data, error } = await this.supabase
      .from('conversations')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true })
      .limit(limit);

    if (error) {
      throw new Error(`Failed to get conversation: ${error.message}`);
    }

    return data || [];
  }

  async getUserProfile(userId: string): Promise<AgentConfig> {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('brand_tone, company_name')
      .eq('id', userId)
      .single();

    if (error) {
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

  async searchKnowledge(
    userId: string,
    query: string,
    limit: number = 5
  ): Promise<KnowledgeResult[]> {
    const { data, error } = await this.supabase
      .from('knowledge_base')
      .select('id, title, content')
      .eq('user_id', userId)
      .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
      .limit(limit);

    if (error) {
      console.error('Knowledge search error:', error);
      return [];
    }

    return data || [];
  }
}
