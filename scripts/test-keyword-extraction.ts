import { extractMeaningfulKeywords, buildSafeSearchPattern, sanitizeSearchInput } from '../utils/sanitizer';

console.log('=== Testing Smart Keyword Extraction ===\n');

// Test 1: Long conversational message
const query1 = "thats great, thanks for asking. just let me know how to upgrade to a pro plan please and what pro plan includes?";
console.log('Query 1:', query1);
console.log('Keywords:', extractMeaningfulKeywords(query1));
console.log('Pattern:', buildSafeSearchPattern(extractMeaningfulKeywords(query1), 7));
console.log('');

// Test 2: Short question
const query2 = "How much does TechFlow cost?";
console.log('Query 2:', query2);
console.log('Keywords:', extractMeaningfulKeywords(query2));
console.log('Pattern:', buildSafeSearchPattern(extractMeaningfulKeywords(query2), 7));
console.log('');

// Test 3: SQL injection attempt
const query3 = "'; DROP TABLE knowledge_entries; --";
console.log('Query 3 (SQL Injection):', query3);
console.log('Keywords:', extractMeaningfulKeywords(query3));
console.log('Pattern:', buildSafeSearchPattern(extractMeaningfulKeywords(query3), 7));
console.log('Sanitized:', sanitizeSearchInput(query3));
console.log('');

// Test 4: Mixed content
const query4 = "I want to integrate with Slack and GitHub for my team";
console.log('Query 4:', query4);
console.log('Keywords:', extractMeaningfulKeywords(query4));
console.log('Pattern:', buildSafeSearchPattern(extractMeaningfulKeywords(query4), 7));
