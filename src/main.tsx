import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AgentTestChat } from './components/AgentTestChat';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AgentTestChat />
  </StrictMode>
);
