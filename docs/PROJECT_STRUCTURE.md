# Project Structure

This is a standalone Vite + React + TypeScript application for testing the AI Agent.

## 📁 Directory Structure

```
.
├── public/
│   └── vite.svg              # Vite logo (favicon)
│
├── src/
│   ├── agent/                # AI Agent Core
│   │   ├── Agent.ts          # Main agent class
│   │   ├── index.ts          # Factory & exports
│   │   ├── prompt.ts         # Prompt builder
│   │   └── types.ts          # Agent types
│   │
│   ├── components/           # React Components
│   │   ├── AgentTestChat.tsx # Main chat component
│   │   └── AgentTestChat.css # Component styles (optional)
│   │
│   ├── pages/                # Page Components
│   │   └── AgentTestPage.tsx # Page wrapper
│   │
│   ├── services/             # Core Services
│   │   ├── ai/
│   │   │   └── AIService.ts  # Anthropic API integration
│   │   ├── database/
│   │   │   └── DatabaseService.ts # Supabase operations
│   │   └── knowledge/
│   │       └── KnowledgeService.ts # Knowledge base search
│   │
│   ├── types/                # TypeScript Types
│   │   ├── conversation.ts   # Conversation types
│   │   └── message.ts        # Message types
│   │
│   ├── main.tsx              # Application entry point
│   ├── index.css             # Global styles (Tailwind)
│   └── AgentTestPage.standalone.tsx # Standalone page (optional)
│
├── scripts/                  # Utility Scripts
│   └── test-agent.ts         # CLI test script
│
├── supabase/
│   └── migrations/           # Database Migrations
│       ├── 001_create_conversations.sql
│       ├── 002_create_knowledge_base.sql
│       └── 003_create_profiles.sql
│
├── index.html                # HTML entry point
├── package.json              # Dependencies & scripts
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
├── tsconfig.node.json        # Node TypeScript config
├── tailwind.config.js        # Tailwind CSS config
├── postcss.config.js         # PostCSS config
├── .gitignore                # Git ignore rules
│
└── Documentation Files:
    ├── README.md             # Main documentation
    ├── QUICK_START.md        # Quick start guide
    ├── SETUP_INSTRUCTIONS.md # Detailed setup
    ├── README_AGENT.md       # Agent documentation
    └── AGENT_TEST_SETUP.md   # Component usage guide
```

## 🔑 Key Files

### Entry Points
- `index.html` - HTML entry point
- `src/main.tsx` - React application entry

### Configuration
- `package.json` - Dependencies and npm scripts
- `vite.config.ts` - Vite build tool configuration
- `tsconfig.json` - TypeScript compiler options
- `tailwind.config.js` - Tailwind CSS configuration

### Core Application
- `src/agent/` - AI Agent logic
- `src/services/` - Business logic services
- `src/components/AgentTestChat.tsx` - Main UI component

## 🚀 Running the Application

1. **Install dependencies**: `npm install`
2. **Set environment variables**: Create `.env.local`
3. **Run dev server**: `npm run dev`
4. **Build for production**: `npm run build`

## 📝 Environment Variables

Store in `.env.local` (not committed to git):
- `VITE_ANTHROPIC_API_KEY`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 🎯 Main Features

- **Chat Interface** (`src/components/AgentTestChat.tsx`)
- **Agent System** (`src/agent/`)
- **Database Integration** (`src/services/database/`)
- **AI Integration** (`src/services/ai/`)
- **Knowledge Base** (`src/services/knowledge/`)
