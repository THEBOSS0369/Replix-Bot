# Repllix Agent Test Application

A standalone React application for testing the AI Agent system with a beautiful chat interface.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_ANTHROPIC_API_KEY=your_anthropic_key_here
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
VITE_TEST_USER_ID=optional_user_id_here
```

You can copy from `.env.example`:
```bash
cp .env.example .env.local
```

Then edit `.env.local` and add your actual API keys.

### 3. Set Up Database

Run the database migrations in your Supabase project:

1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Run the migration files from `supabase/migrations/` in order:
   - `001_create_conversations.sql`
   - `002_create_knowledge_base.sql`
   - `003_create_profiles.sql`

### 4. Run the Application

```bash
npm run dev
```

The application will open at `http://localhost:5173`

## 📁 Project Structure

```
.
├── src/
│   ├── agent/              # Agent core logic
│   ├── components/         # React components
│   ├── services/           # AI, Database, Knowledge services
│   ├── types/              # TypeScript type definitions
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── supabase/
│   └── migrations/        # Database migrations
├── scripts/
│   └── test-agent.ts      # CLI test script
└── package.json
```

## 🧪 Testing

### Web Interface
Just run `npm run dev` and use the chat interface in your browser.

### CLI Testing
You can also test the agent from the command line:

```bash
npm run test:agent
```

## 🎨 Features

- ✨ Beautiful, modern chat interface
- 💬 Real-time conversation with AI agent
- 📚 Knowledge base integration indicators
- 🌙 Dark mode support
- 📱 Fully responsive design
- ⚠️ Error handling and display
- ⌨️ Keyboard shortcuts (Enter to send)

## 🛠️ Development

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_ANTHROPIC_API_KEY` | Your Anthropic Claude API key | Yes |
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |
| `VITE_TEST_USER_ID` | Test user ID (optional, generates one if not set) | No |

**Note**: All environment variables must be prefixed with `VITE_` to be accessible in client-side code.

## 🔧 Troubleshooting

### "ANTHROPIC_API_KEY not found"
- Make sure `.env.local` exists with `VITE_ANTHROPIC_API_KEY`
- Restart the dev server after adding env variables

### "Supabase credentials not found"
- Check that `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
- Verify the values are correct in your Supabase dashboard

### Database errors
- Ensure migrations have been run in Supabase
- Check that tables exist in your database

### Styling issues
- Make sure Tailwind CSS is working: check that `src/index.css` is imported
- Verify `tailwind.config.js` and `postcss.config.js` are present

## 📚 Additional Resources

- [Agent Implementation Guide](./README_AGENT.md) - Detailed agent documentation
- [Test Setup Guide](./AGENT_TEST_SETUP.md) - Component usage guide
- [Dependencies](./DEPENDENCIES.md) - Dependency information

## 📄 License

Private project
