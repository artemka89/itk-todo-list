import { type FC } from 'react';
import { Navigate, Outlet } from 'react-router';

import { tokenManager } from '@/shared/lib/token-manager';
import { ROUTES } from '@/shared/routes';

import { useMeQuery } from '../model/api';

export const GuestGuard: FC = () => {
  const { data: user, isLoading } = useMeQuery(null, {
    skip: !tokenManager.accessToken
  });

  if (isLoading) {
    return null;
  }

  if (!user) {
    return <Outlet />;
  }
  return <Navigate to={ROUTES.TODOS} replace />;
};
