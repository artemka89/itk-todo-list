import { type FC } from 'react';
import { Outlet } from 'react-router';

import { LogoutButton } from '@/features/auth';
import { Header } from '@/features/header';
import { ThemeToggleButton } from '@/features/theme-toggle';

export const MainLayout: FC = () => {
  return (
    <>
      <Header
        actions={
          <>
            <LogoutButton />
            <ThemeToggleButton />
          </>
        }
      />
      <main className='mt-4 h-[calc(100vh-var(--header-height)-16px))]'>
        <Outlet />
      </main>
    </>
  );
};
