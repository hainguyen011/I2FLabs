import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './i18n';
import App from './App.tsx';
import './index.css';
import { omegaEngine } from './engine/omega';

// Boot Aevum Omega Engine for 0ms Input Precognitive Intent
if (typeof window !== 'undefined') {
  omegaEngine.boot();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
