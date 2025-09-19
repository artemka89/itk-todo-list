import { type FC } from 'react';
import { Outlet } from 'react-router';

import { ThemeToggleButton } from '@/features/theme-toggle';
import { cn } from '@/shared/lib/cn';
import { Container } from '@/shared/ui/container';

interface AuthLayoutProps {
  className?: string;
}

export const AuthLayout: FC<AuthLayoutProps> = ({ className }) => {
  return (
    <>
      <header>
        <Container className='flex h-16 items-center justify-end'>
          <ThemeToggleButton />
        </Container>
      </header>
      <main
        className={cn(
          className,
          '-mt-16 flex h-[calc(100vh-64px)] items-center justify-center p-4'
        )}
      >
        <Outlet />
      </main>
    </>
  );
};
