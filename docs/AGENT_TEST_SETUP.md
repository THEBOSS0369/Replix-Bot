# Agent Test Chat Setup

A simple, beautiful chat interface has been created to test the AI agent.

## Files Created

1. **`src/components/AgentTestChat.tsx`** - Main chat component
2. **`src/pages/AgentTestPage.tsx`** - Page wrapper (for routing)
3. **`src/AgentTestPage.standalone.tsx`** - Standalone version (no routing needed)

## Quick Setup

### Option 1: Add as a Route (Recommended)

If you're using React Router, add this route to your router:

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AgentTestPage from './pages/AgentTestPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ... your existing routes ... */}
        <Route path="/test-agent" element={<AgentTestPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

Then navigate to: `http://localhost:5173/test-agent`

### Option 2: Direct Import (Simple)

If you want to test it quickly without routing:

```typescript
// In your App.tsx or main component
import AgentTestChat from './components/AgentTestChat';

function App() {
  return (
    <div>
      {/* Your other components */}
      <AgentTestChat />
    </div>
  );
}
```

### Option 3: Standalone Entry Point

Create a simple entry point file:

```typescript
// test-agent.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import AgentTestPage from './src/AgentTestPage.standalone';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AgentTestPage />
  </React.StrictMode>
);
```

## Environment Variables

Make sure you have these in your `.env.local`:

**Important for Vite**: Client-side code can only access variables with `VITE_` prefix.

```env
# For client-side usage (browser), use VITE_ prefix
VITE_ANTHROPIC_API_KEY=your_key_here
VITE_SUPABASE_URL=your_url_here
VITE_SUPABASE_ANON_KEY=your_key_here
VITE_TEST_USER_ID=optional_user_id_here  # Optional, will generate one if not set
```

**Security Note**: Exposing API keys in client-side code is not recommended for production. For production, use Supabase Edge Functions to call the agent server-side. For testing/development, using `VITE_` prefixed variables is fine.

## Features

- ✨ Clean, modern UI with light blue theme
- 💬 Real-time chat interface
- 📚 Shows when knowledge base is used
- ⚠️ Error handling with clear messages
- 🌙 Dark mode support
- 📱 Responsive design
- ⌨️ Keyboard shortcuts (Enter to send, Shift+Enter for new line)
- 🔄 Loading states and animations
- 🗑️ Clear chat button

## Styling

The component uses Tailwind CSS classes. Make sure Tailwind is configured in your project. If you're using shadcn/ui, the styling should work out of the box.

The color scheme follows your preferences:
- Light blue-based theme
- Minimal, modern design
- Warm, approachable feel

## Troubleshooting

### Component not rendering
- Check that Tailwind CSS is installed and configured
- Ensure React and ReactDOM are installed
- Check browser console for errors

### "Agent not found" or environment variable errors
- Verify `.env.local` exists and has all required variables
- Restart your dev server after adding env variables
- Check that `VITE_` prefix is used for client-side variables

### Messages not appearing
- Check browser console for errors
- Verify Supabase connection
- Ensure database migrations have been run
- Check that user_id is valid

## Customization

You can customize the component by:

1. **Changing colors**: Modify the Tailwind classes (blue-* colors)
2. **Session handling**: Modify the `sessionId` and `userId` generation logic
3. **Styling**: Add custom CSS or modify Tailwind classes
4. **Features**: Add message history, export, etc.

## Next Steps

After testing, you can:
1. Integrate this into your main application
2. Add more features (file uploads, voice, etc.)
3. Connect to your authentication system
4. Style to match your brand exactly
