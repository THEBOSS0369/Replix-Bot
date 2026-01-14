import { useState, useRef, useEffect } from 'react';
import { createAgent } from '../agent';
import { v4 as uuidv4 } from 'uuid';
import type { AgentResponse } from '../agent/types';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: {
    kb_used?: boolean;
    kb_articles?: string[];
    error?: boolean;
  };
}

export function AgentTestChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => uuidv4());
  const [userId] = useState(() => {
    // Use a default test user ID, or get from env
    return import.meta.env.VITE_TEST_USER_ID || uuidv4();
  });
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);
    setError(null);

    // Add user message to UI
    const newUserMessage: Message = {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newUserMessage]);

    try {
      // Create agent and process message
      const agent = createAgent();
      const response: AgentResponse = await agent.process(
        userMessage,
        sessionId,
        userId,
        'web'
      );

      // Add assistant response to UI
      const assistantMessage: Message = {
        role: 'assistant',
        content: response.message,
        timestamp: new Date(),
        metadata: response.metadata
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Agent error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      
      // Add error message to chat
      const errorMsg: Message = {
        role: 'assistant',
        content: `Error: ${errorMessage}. Please check your environment variables and ensure the agent is properly configured.`,
        timestamp: new Date(),
        metadata: { error: true }
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClear = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-blue-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-blue-900 dark:text-blue-100">
                Agent Test Chat
              </h1>
              <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                Session: {sessionId.substring(0, 8)}...
              </p>
            </div>
            <button
              onClick={handleClear}
              className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 bg-blue-50 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              Clear Chat
            </button>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800">
          <div className="max-w-4xl mx-auto px-4 py-2">
            <p className="text-sm text-red-700 dark:text-red-400">
              ⚠️ {error}
            </p>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-block p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                <svg
                  className="w-12 h-12 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-medium text-blue-900 dark:text-blue-100 mb-2">
                Start a conversation
              </h2>
              <p className="text-blue-600 dark:text-blue-400">
                Type a message below to test the AI agent
              </p>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : message.metadata?.error
                    ? 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-blue-100 dark:border-gray-700'
                }`}
              >
                <div className="whitespace-pre-wrap break-words">
                  {message.content}
                </div>
                {message.metadata?.kb_used && (
                  <div className="mt-2 pt-2 border-t border-blue-200 dark:border-blue-700">
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                      📚 Knowledge base used
                      {message.metadata.kb_articles && message.metadata.kb_articles.length > 0 && (
                        <span className="ml-1">
                          ({message.metadata.kb_articles.join(', ')})
                        </span>
                      )}
                    </p>
                  </div>
                )}
                <div className="mt-2 text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-gray-800 border border-blue-100 dark:border-gray-700 rounded-2xl px-4 py-3 shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white dark:bg-gray-800 border-t border-blue-200 dark:border-gray-700 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
                rows={1}
                disabled={isLoading}
                className="w-full px-4 py-3 pr-12 bg-blue-50 dark:bg-gray-700 border border-blue-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  maxHeight: '120px',
                  minHeight: '48px'
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = Math.min(target.scrollHeight, 120) + 'px';
                }}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending
                </span>
              ) : (
                'Send'
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 ml-1">
            Make sure your environment variables are set (ANTHROPIC_API_KEY, VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
          </p>
        </div>
      </div>
    </div>
  );
}
