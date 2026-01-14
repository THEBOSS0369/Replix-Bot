# AI Agent System - Implementation Complete

This document provides setup instructions for the AI Agent system that has been integrated into your project.

## 📁 Project Structure

```
src/
├── agent/
│   ├── Agent.ts              # Main agent class
│   ├── prompt.ts             # Prompt builder
│   ├── types.ts              # Agent-specific types
│   └── index.ts              # Factory & exports
├── services/
│   ├── ai/
│   │   └── AIService.ts      # Anthropic API integration
│   ├── database/
│   │   └── DatabaseService.ts # Supabase operations
│   └── knowledge/
│       └── KnowledgeService.ts # KB search logic
├── types/
│   ├── message.ts            # Message types
│   └── conversation.ts       # Conversation types
supabase/
└── migrations/
    ├── 001_create_conversations.sql
    ├── 002_create_knowledge_base.sql
    └── 003_create_profiles.sql
scripts/
└── test-agent.ts             # Test script
```

## 🚀 Setup Instructions

### Step 1: Install Dependencies

Add these dependencies to your `package.json` and run `npm install`:

**Production:**
- `@anthropic-ai/sdk` - Anthropic Claude API client
- `uuid` - Generate unique IDs for sessions
- `dotenv` - Environment variable management

**Dev Dependencies:**
- `@types/uuid` - TypeScript types for uuid
- `tsx` - TypeScript execution (for test scripts)

See `DEPENDENCIES.md` for details.

### Step 2: Environment Variables

Create a `.env.local` file in your project root with:

```env
ANTHROPIC_API_KEY=your_anthropic_key_here
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

**Note:** For Vite projects, client-side code will use `import.meta.env.VITE_SUPABASE_URL`. The agent factory handles both Node.js (`process.env`) and Vite (`import.meta.env`) patterns.

### Step 3: Database Migrations

Run the database migrations in your Supabase project:

1. Navigate to your Supabase dashboard
2. Go to SQL Editor
3. Run each migration file in order:
   - `001_create_conversations.sql`
   - `002_create_knowledge_base.sql`
   - `003_create_profiles.sql`

Or use Supabase CLI:
```bash
supabase migration up
```

### Step 4: Add NPM Scripts

Add to your `package.json`:

```json
{
  "scripts": {
    "test:agent": "tsx scripts/test-agent.ts"
  }
}
```

See `NPM_SCRIPTS.md` for details.

## 🧪 Testing

After setup, you can test the agent:

```bash
npm run test:agent
```

Make sure to set `TEST_USER_ID` in your `.env.local` if you want to use a specific user ID for testing.

## 📖 Usage

### Basic Usage

```typescript
import { createAgent } from './src/agent';
import { v4 as uuidv4 } from 'uuid';

// Create agent instance
const agent = createAgent();

// Process a message
const response = await agent.process(
  "Hello, how can I help?",
  uuidv4(), // session ID
  "user-id-here", // user ID
  "web" // source: 'web' | 'telegram' | 'whatsapp'
);

console.log(response.message);
```

### In React Components

```typescript
import { createAgent } from '@/src/agent';
import { useState } from 'react';

function ChatComponent() {
  const [message, setMessage] = useState('');
  
  const handleSend = async () => {
    const agent = createAgent();
    const response = await agent.process(
      message,
      sessionId,
      userId,
      'web'
    );
    // Handle response
  };
  
  // ... rest of component
}
```

## 🎯 Features

- **Single Universal Support Agent** - Handles all customer queries
- **Knowledge Base Integration** - Automatically searches KB when relevant
- **Brand Tone Support** - Friendly, Professional, or Casual tones
- **Conversation History** - Maintains context across messages
- **Error Handling** - Graceful error handling with brand-appropriate messages
- **Multi-channel Ready** - Supports web, telegram, whatsapp sources

## 🔧 Configuration

### Brand Tone

Set brand tone in the `profiles` table:

```sql
UPDATE profiles 
SET brand_tone = 'friendly' -- or 'professional' or 'casual'
WHERE id = 'user-id';
```

### Company Name

```sql
UPDATE profiles 
SET company_name = 'Your Company Name'
WHERE id = 'user-id';
```

## 📝 Next Steps

1. **Add Knowledge Base Content** - Populate the `knowledge_base` table with your content
2. **Integrate UI** - Create React components for chat interface
3. **Add Channels** - Implement Telegram/WhatsApp channel handlers
4. **Edge Functions** - Create Supabase edge functions for API endpoints

## 🐛 Troubleshooting

### "ANTHROPIC_API_KEY not found"
- Make sure `.env.local` exists with `ANTHROPIC_API_KEY`
- For Node.js scripts, ensure `dotenv` loads the file
- For Vite, use `VITE_` prefix if needed client-side

### "Supabase credentials not found"
- Check `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env.local`
- Verify Supabase client initialization pattern matches your project

### Database errors
- Ensure migrations have been run
- Check table names match exactly (case-sensitive)
- Verify user_id exists in `auth.users` table

## 📚 Additional Resources

- See `mvpAgent_implementation_plan.md` for detailed implementation notes
- See `agent_complete_guide.md` for future multi-agent architecture
- Anthropic API docs: https://docs.anthropic.com
- Supabase docs: https://supabase.com/docs
