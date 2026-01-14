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
  role: 'user' | 'assistant';
  source: 'web' | 'telegram' | 'whatsapp';
  metadata?: Record<string, any>;
}
