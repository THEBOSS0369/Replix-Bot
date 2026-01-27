const MAX_SEARCH_INPUT_LENGTH = 100;
const MIN_SEARCH_TERM_LENGTH = 1;

/**
 * Sanitize a single search input to prevent SQL injection
 */
export function sanitizeSearchInput(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Normalize whitespace
  let sanitized = input.replace(/\s+/g, ' ').trim();

  // Limit length
  if (sanitized.length > MAX_SEARCH_INPUT_LENGTH) {
    sanitized = sanitized.slice(0, MAX_SEARCH_INPUT_LENGTH);
  }

  // Remove SQL injection characters and wildcards
  sanitized = sanitized.replace(/[%\\;'"`]/g, '');
  sanitized = sanitized.trim();

  // Ensure minimum length
  if (sanitized.length < MIN_SEARCH_TERM_LENGTH) {
    return '';
  }

  return sanitized;
}

/**
 * Build a safe search pattern from multiple terms
 */
export function buildSafeSearchPattern(
  terms: string[],
  maxTerms: number = 5
): string {
  const limitedTerms = terms.slice(0, maxTerms);
  const sanitizedTerms = limitedTerms
    .map(sanitizeSearchInput)
    .filter((term) => term.length >= MIN_SEARCH_TERM_LENGTH);

  if (sanitizedTerms.length === 0) {
    return '';
  }

  return sanitizedTerms.join('%');
}

/**
 * Validate a search pattern before using it
 */
export function isValidSearchPattern(pattern: string): boolean {
  if (!pattern || pattern.length === 0) {
    return false;
  }

  // Check for SQL injection attempts
  if (/[%_\\;'"`]/.test(pattern)) {
    return false;
  }

  // Reasonable length check
  if (pattern.length > MAX_SEARCH_INPUT_LENGTH * 5 + 10) {
    return false;
  }

  return true;
}

/**
 * Extract meaningful keywords from a long query
 * Removes stop words and sorts by relevance
 */
export function extractMeaningfulKeywords(query: string): string[] {
  // Comprehensive stop words list
  const stopWords = new Set([
    // Articles, conjunctions, prepositions
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at',
    'to', 'for', 'of', 'with', 'by', 'from', 'as',
    
    // Common verbs and helpers
    'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did',
    
    // Question words (keep content, not question structure)
    'how', 'what', 'when', 'where', 'who', 'why', 'which',
    
    // Polite filler words
    'please', 'thanks', 'thank', 'you', 'great', 'thats',
    'asking', 'just', 'let', 'me', 'know', 'tell', 'could',
    'would', 'should', 'can', 'will',
    
    // Common conversational phrases
    'want', 'need', 'hello', 'hi', 'hey', 'yes', 'no',
    'okay', 'ok', 'sure', 'got', 'get', 'it'
  ]);

  if (!query || typeof query !== 'string') {
    return [];
  }

  // Extract words
  const words = query
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ') // Remove punctuation
    .split(/\s+/)
    .filter(word => 
      word.length > 2 &&           // Min 3 characters
      !stopWords.has(word) &&      // Not a stop word
      !/^\d+$/.test(word)          // Not pure numbers
    );

  // Remove duplicates
  const uniqueWords = Array.from(new Set(words));

  // Sort by length (longer = more specific)
  uniqueWords.sort((a, b) => b.length - a.length);

  return uniqueWords;
}
