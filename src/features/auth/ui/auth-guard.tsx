import { type FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';

import { tokenManager } from '@/shared/lib/token-manager';
import { ROUTES } from '@/shared/routes';

import { useMeQuery } from '../model/api';

export const AuthGuard: FC = () => {
  const { data: user, isLoading } = useMeQuery(null, {
    skip: !tokenManager.accessToken
  });
  const location = useLocation();

  if (isLoading) {
    return null;
  }

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }
  return <Outlet />;
};
