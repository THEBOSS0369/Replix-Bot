# Quick Start Guide

Get up and running in 3 steps!

## 1️⃣ Install

```bash
npm install
```

## 2️⃣ Configure

Create `.env.local` file:

```env
VITE_ANTHROPIC_API_KEY=your_key_here
VITE_SUPABASE_URL=your_url_here
VITE_SUPABASE_ANON_KEY=your_key_here
```

**Need help finding these?** See [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md)

## 3️⃣ Run

```bash
npm run dev
```

🎉 Your browser should open automatically at `http://localhost:5173`

---

## 🗄️ Database Setup (One-time)

Run these SQL files in Supabase SQL Editor (in order):

1. `supabase/migrations/001_create_conversations.sql`
2. `supabase/migrations/002_create_knowledge_base.sql`
3. `supabase/migrations/003_create_profiles.sql`

---

That's it! Start chatting with the AI agent. 💬

For detailed instructions, see [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md)
