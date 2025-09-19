import { createBrowserRouter, Navigate } from 'react-router';

import {
  AuthGuard,
  GuestGuard,
  LoginForm,
  RegisterForm
} from '@/features/auth';
import { TodosPage } from '@/features/todo';
import { ROUTES } from '@/shared/routes';

import { AuthLayout } from '../layouts/auth-layout';
import { MainLayout } from '../layouts/main-layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={ROUTES.TODOS} replace />
  },

  {
    element: <AuthGuard />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: ROUTES.TODOS,
            element: <TodosPage />
          }
        ]
      }
    ]
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
