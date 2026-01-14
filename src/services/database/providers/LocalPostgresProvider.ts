import pg from 'pg';
import { Message, MessageInput } from '../../../types/message';
import { AgentConfig } from '../../../agent/types';
import { DatabaseProvider, KnowledgeResult } from './types';

const { Pool } = pg;

export interface LocalPostgresConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}

export class LocalPostgresProvider implements DatabaseProvider {
  private pool: pg.Pool;

  constructor(config: LocalPostgresConfig) {
    this.pool = new Pool({
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.user,
      password: config.password,
    });
  }

  async saveMessage(messageInput: MessageInput): Promise<Message> {
    const query = `
      INSERT INTO conversations (session_id, user_id, role, content, source, metadata)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const values = [
      messageInput.session_id,
      messageInput.user_id,
      messageInput.role,
      messageInput.content,
      messageInput.source,
      JSON.stringify(messageInput.metadata || {}),
    ];

    try {
      const result = await this.pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to save message: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async getConversationHistory(
    sessionId: string,
    limit: number = 20
  ): Promise<Message[]> {
    const query = `
      SELECT * FROM conversations
      WHERE session_id = $1
      ORDER BY created_at ASC
      LIMIT $2
    `;

    try {
      const result = await this.pool.query(query, [sessionId, limit]);
      return result.rows;
    } catch (error) {
      throw new Error(
        `Failed to get conversation: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async getUserProfile(userId: string): Promise<AgentConfig> {
    const query = `
      SELECT brand_tone, company_name FROM profiles
      WHERE id = $1
    `;

    try {
      const result = await this.pool.query(query, [userId]);

      if (result.rows.length === 0) {
        return {
          brand_tone: 'friendly',
          company_name: 'Our Company',
        };
      }

      const row = result.rows[0];
      return {
        brand_tone: row.brand_tone || 'friendly',
        company_name: row.company_name || 'Our Company',
      };
    } catch (error) {
      // Return defaults if query fails
      return {
        brand_tone: 'friendly',
        company_name: 'Our Company',
      };
    }
  }

  async searchKnowledge(
    userId: string,
    query: string,
    limit: number = 5
  ): Promise<KnowledgeResult[]> {
    const sqlQuery = `
      SELECT id, title, content FROM knowledge_base
      WHERE user_id = $1
        AND (title ILIKE $2 OR content ILIKE $2)
      LIMIT $3
    `;

    const searchPattern = `%${query}%`;

    try {
      const result = await this.pool.query(sqlQuery, [
        userId,
        searchPattern,
        limit,
      ]);
      return result.rows;
    } catch (error) {
      console.error('Knowledge search error:', error);
      return [];
    }
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}
