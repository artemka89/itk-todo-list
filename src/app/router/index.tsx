import { createBrowserRouter, Navigate } from 'react-router';

import { GuestGuard, LoginForm, RegisterForm } from '@/features/auth';
import { ROUTES } from '@/shared/routes';

import { AuthLayout } from '../layouts/auth-layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={ROUTES.TODOS} replace />
  },

  {
    element: <GuestGuard />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: ROUTES.LOGIN,
            element: <LoginForm />
          },
          {
            path: ROUTES.REGISTER,
            element: <RegisterForm />
          }
        ]
      }
    ]
  },

  {
    path: '*',
    element: <div>404</div>
  }
]);
