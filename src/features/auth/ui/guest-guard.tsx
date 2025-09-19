import { type FC } from 'react';
import { Navigate, Outlet } from 'react-router';

import { ROUTES } from '@/shared/routes';

import { useMeQuery } from '../model/api';

export const GuestGuard: FC = () => {
  const { data: user, isLoading } = useMeQuery();

  if (isLoading) {
    return null;
  }

  if (!user) {
    return <Outlet />;
  }
  return <Navigate to={ROUTES.TODOS} replace />;
};
