import { Message } from './message';

export interface Conversation {
  session_id: string;
  messages: Message[];
  user_id: string;
  started_at: Date;
  last_message_at: Date;
}

export interface ConversationHistory {
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}
