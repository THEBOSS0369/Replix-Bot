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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
    }
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
    <div className="flex flex-col h-screen bg-[#fafaf9] dark:bg-[#1c1917] font-sans text-stone-800 dark:text-stone-100">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto scrollbar-none pb-32">
        <div className="max-w-2xl mx-auto px-6 py-10 space-y-8">
          
          {/* Header Status */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-full px-4 py-1.5 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                <span className="text-xs font-medium text-stone-600 dark:text-stone-300">Agent Active</span>
                <div className="h-3 w-px bg-stone-300 dark:bg-stone-600 mx-2"></div>
                <button 
                  onClick={handleClear}
                  className="text-xs font-medium text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
                >
                  Reset
                </button>
            </div>
            {messages.length === 0 && (
                <div className="mt-12 text-center animate-enter">
                    <div className="w-16 h-16 bg-gradient-to-tr from-amber-200 to-orange-100 dark:from-stone-700 dark:to-stone-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-orange-500/10 mb-6 border border-stone-100 dark:border-stone-700">
                        <svg className="w-8 h-8 text-orange-600 dark:text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-2">How can I help you?</h2>
                    <p className="text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
                        Ask me anything about our products or services.
                    </p>
                </div>
            )}
          </div>

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 animate-enter ${
                message.role === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              {/* Avatar */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.role === 'user' 
                    ? 'bg-stone-200 dark:bg-stone-700' 
                    : 'bg-gradient-to-tr from-amber-700 to-orange-600 shadow-md shadow-orange-900/10'
              }`}>
                {message.role === 'user' ? (
                    <svg className="w-4 h-4 text-stone-500 dark:text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                ) : (
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[80%] rounded-2xl px-5 py-3.5 shadow-sm text-[15px] leading-relaxed ${
                  message.role === 'user'
                    ? 'bg-[#292524] text-white rounded-tr-sm' // stone-800 equivalent for user (dark brown/black)
                    : message.metadata?.error
                    ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-200 border border-red-100 dark:border-red-800'
                    : 'bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-100 dark:border-stone-700 rounded-tl-sm'
                }`}
              >
                <div className="whitespace-pre-wrap break-words">
                  {message.content}
                </div>
                
                {message.metadata?.kb_used && (
                  <div className="mt-3 pt-3 border-t border-stone-100 dark:border-stone-700/50 flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <span className="text-xs text-orange-700/80 dark:text-orange-300/80 font-medium">
                        Used Knowledge Base
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-start gap-4 animate-enter">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-tr from-amber-700 to-orange-600 flex items-center justify-center shadow-md shadow-orange-900/10">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <div className="bg-white dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm">
                    <div className="flex space-x-1.5">
                        <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area (Floating) */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#fafaf9] to-transparent dark:from-[#1c1917] pointer-events-none">
        <div className="max-w-2xl mx-auto pointer-events-auto">
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl opacity-10 group-hover:opacity-20 transition duration-500 blur"></div>
                <div className="relative bg-white dark:bg-stone-900 rounded-xl shadow-xl border border-stone-200/50 dark:border-stone-700/50 flex items-end overflow-hidden">
                    <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Message Agent..."
                        className="w-full bg-transparent border-0 focus:ring-0 px-5 py-4 min-h-[60px] max-h-[200px] resize-none text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500"
                        rows={1}
                        disabled={isLoading}
                        onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = Math.min(target.scrollHeight, 200) + 'px';
                        }}
                    />
                    <div className="pb-3 pr-3">
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || isLoading}
                            className={`p-2 rounded-lg transition-all duration-200 ${
                                input.trim() && !isLoading
                                    ? 'bg-stone-800 text-white shadow-md hover:bg-stone-700 transform hover:scale-105' 
                                    : 'bg-stone-100 dark:bg-stone-800 text-stone-400 cursor-not-allowed'
                            }`}
                        >
                            {isLoading ? (
                                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <div className="text-center mt-3">
                <p className="text-[10px] text-stone-400 dark:text-stone-500 font-medium tracking-wide uppercase">
                    Powered by Repllix AI
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}
