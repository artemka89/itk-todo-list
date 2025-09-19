import { type FC } from 'react';
import { Outlet } from 'react-router';

import { cn } from '@/shared/lib/cn';

interface AuthLayoutProps {
  className?: string;
}

export const AuthLayout: FC<AuthLayoutProps> = ({ className }) => {
  return (
    <main
      className={cn(className, 'flex h-screen items-center justify-center p-4')}
    >
      <Outlet />
    </main>
  );
};
