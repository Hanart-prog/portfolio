import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/App';
import { TooltipProvider } from '@/components/ui/tooltip';
import '@/i18n';
import '@/index.css';
import { initGoogleAnalytics } from '@/lib/google-analytics';

document.documentElement.style.scrollbarGutter = 'stable';
initGoogleAnalytics();

// oxlint-disable-next-line typescript/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TooltipProvider>
      <App />
    </TooltipProvider>
  </StrictMode>,
);
