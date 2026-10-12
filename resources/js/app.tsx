import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../../src/App';
import '../../src/index.css';
import { LanguageProvider } from '../../src/context/LanguageContext';
import { ThemeProvider } from '../../src/context/ThemeContext';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <ThemeProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}
