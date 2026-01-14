export interface AgentConfig {
  brand_tone: 'friendly' | 'professional' | 'casual';
  company_name: string;
  max_history_messages?: number; // default 20
}

export interface AgentResponse {
  message: string;
  session_id: string;
  metadata?: {
    kb_used: boolean;
    kb_articles?: string[];
    error?: boolean;
  };
}

export interface KnowledgeResult {
  id: string;
  title: string;
  content: string;
  relevance_score?: number;
}
