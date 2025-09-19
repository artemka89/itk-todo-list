import { createBrowserRouter } from 'react-router';

import { LoginForm } from '@/features/auth';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginForm />
  },

  {
    path: '*',
    element: <div>404</div>
  }
]);
