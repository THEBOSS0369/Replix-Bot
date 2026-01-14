/**
 * Example: How to use AgentTestChat component
 * 
 * Choose one of these methods based on your setup
 */

// ============================================
// METHOD 1: As a Route (React Router)
// ============================================
/*
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AgentTestPage from './pages/AgentTestPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test-agent" element={<AgentTestPage />} />
      </Routes>
    </BrowserRouter>
  );
}
*/

// ============================================
// METHOD 2: Direct Import in App
// ============================================
/*
import { AgentTestChat } from './components/AgentTestChat';

function App() {
  return (
    <div>
      <h1>My App</h1>
      <AgentTestChat />
    </div>
  );
}
*/

// ============================================
// METHOD 3: Conditional Rendering
// ============================================
/*
import { useState } from 'react';
import { AgentTestChat } from './components/AgentTestChat';

function App() {
  const [showAgentTest, setShowAgentTest] = useState(false);

  return (
    <div>
      <button onClick={() => setShowAgentTest(!showAgentTest)}>
        {showAgentTest ? 'Hide' : 'Show'} Agent Test
      </button>
      
      {showAgentTest && <AgentTestChat />}
    </div>
  );
}
*/

// ============================================
// METHOD 4: Standalone Entry Point
// ============================================
/*
// Create: test-agent.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import AgentTestPage from './src/AgentTestPage.standalone';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AgentTestPage />
  </React.StrictMode>
);

// Add to vite.config.ts:
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        'test-agent': './test-agent.html'
      }
    }
  }
});
*/
