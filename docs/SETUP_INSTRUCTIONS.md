# Setup Instructions

Follow these steps to get the application running:

## Step 1: Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install all required packages including:

- React and React DOM
- Vite (build tool)
- Tailwind CSS
- TypeScript
- Anthropic SDK
- Supabase client
- And more...

## Step 2: Configure Environment Variables

1. Create a `.env.local` file in the root directory (same level as `package.json`)

2. Add your environment variables:

```env
VITE_ANTHROPIC_API_KEY=sk-ant-your-key-here
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Where to find these:**

- **Anthropic API Key**:

  - Go to https://console.anthropic.com/
  - Sign up or log in
  - Navigate to API Keys section
  - Create a new API key

- **Supabase URL & Key**:
  - Go to https://supabase.com/
  - Create a project or use existing one
  - Go to Project Settings > API
  - Copy the "Project URL" and "anon public" key

## Step 3: Set Up Database

1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Create a new query
4. Copy and paste the contents of each migration file from `supabase/migrations/`:
   - First run: `001_create_conversations.sql`
   - Then run: `002_create_knowledge_base.sql`
   - Finally run: `003_create_profiles.sql`
5. Click "Run" for each query

Alternatively, if you have Supabase CLI:

```bash
supabase migration up
```

## Step 4: Run the Application

```bash
npm run dev
```

The application will:

- Start the development server
- Open automatically in your browser at `http://localhost:5173`
- Hot reload on file changes

## Step 5: Test It!

1. Type a message in the chat input (e.g., "Hello!")
2. Press Enter or click "Send"
3. Wait for the AI agent's response
4. Try asking questions that might use the knowledge base

## Troubleshooting

### "ANTHROPIC_API_KEY not found"

- Make sure `.env.local` exists in the root directory
- Verify the variable name is `VITE_ANTHROPIC_API_KEY` (with VITE\_ prefix)
- Restart the dev server after creating/editing `.env.local`

### "Supabase credentials not found"

- Check that `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
- Verify there are no extra spaces in the values
- Restart the dev server

### Database errors

- Ensure all 3 migration files have been run in Supabase
- Check the Supabase dashboard to verify tables exist:
  - `conversations`
  - `knowledge_base`
  - `profiles`

### Port 5173 already in use

- Change the port in `vite.config.ts`:
  ```ts
  server: {
    port: 3000, // or any other port
  }
  ```

### Styling not working

- Make sure Tailwind CSS is installed: `npm install -D tailwindcss postcss autoprefixer`
- Verify `src/index.css` imports Tailwind directives
- Check browser console for errors

## Next Steps

- Add knowledge base content in Supabase `knowledge_base` table
- Customize the brand tone in the `profiles` table
- Test different conversation flows
- Build additional features!

For more information, see [README.md](./README.md)
