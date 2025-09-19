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
      <header className='flex h-[var(--header-height)] items-center'>
        <Container className='flex flex-1 justify-end'>
          <ThemeToggleButton className='ml-auto' />
        </Container>
      </header>
      <main
        className={cn(
          className,
          '-mt-16 flex h-[calc(100vh-var(--header-height))] items-center justify-center p-4'
        )}
      >
        <Outlet />
      </main>
    </>
  );
};
