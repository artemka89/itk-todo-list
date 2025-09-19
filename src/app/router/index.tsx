import { createBrowserRouter } from 'react-router';

import { RegisterForm } from '@/features/auth/ui/register-form';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RegisterForm />
  },

  {
    path: '*',
    element: <div>404</div>
  }
]);
