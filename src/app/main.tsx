import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';
import { Toaster } from 'sonner';

import { ThemeProvider } from './providers/theme-provider';
import { router } from './router';
import { store } from './store';

import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NuqsAdapter>
      <Provider store={store}>
        <ThemeProvider
          defaultTheme='dark'
          storageKey='vite-ui-theme'
          renderTheme={(theme) => (
            <Toaster richColors position='top-right' theme={theme} />
          )}
        >
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </NuqsAdapter>
  </StrictMode>
);
