import { DatabaseProvider } from '../database/DatabaseService';
import { KnowledgeResult } from '../../agent/types';
import { extractMeaningfulKeywords, buildSafeSearchPattern } from '../../utils/sanitizer';

export class KnowledgeService {
  constructor(private dbService: DatabaseProvider) {}

  /**
   * Search knowledge base for relevant articles using smart keyword extraction
   */
  async search(
    user_id: string,
    query: string,
    limit: number = 3
  ): Promise<KnowledgeResult[]> {
    // Extract meaningful keywords from the query
    const keywords = extractMeaningfulKeywords(query);
    
    if (keywords.length === 0) {
      return []; // No valid keywords
    }

    // Build safe search pattern (max 7 keywords)
    const searchPattern = buildSafeSearchPattern(keywords, 7);
    
    if (!searchPattern) {
      return []; // Invalid pattern
    }

    // Search database with keyword pattern
    const results = await this.dbService.searchKnowledge(
      user_id,
      searchPattern,
      limit
    );

    // Convert to KnowledgeResult format
    return results.map(r => ({
      id: r.id,
      title: r.title,
      content: r.content,
      relevance_score: 1.0 // Simple - no scoring yet
    }));
  }

  /**
   * Extract keywords from query (simple implementation)
   */
  private extractKeywords(query: string): string[] {
    // Remove common words
    const stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at',
      'to', 'for', 'of', 'with', 'by', 'from', 'how', 'what',
      'when', 'where', 'who', 'why', 'is', 'are', 'was', 'were'
    ]);

    return query
      .toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.has(word));
  }

  /**
   * Check if query should trigger KB search
   */
  shouldSearchKnowledge(query: string): boolean {
    const questionWords = ['how', 'what', 'when', 'where', 'why', 'can'];
    const lowerQuery = query.toLowerCase();
    
    // Search if it's a question or if it mentions specific keywords
    return questionWords.some(word => lowerQuery.includes(word)) ||
           query.includes('?');
  }
}
