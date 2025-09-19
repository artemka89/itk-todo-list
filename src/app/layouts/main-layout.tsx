import { type FC } from 'react';
import { Outlet } from 'react-router';

import { Header } from '@/features/header';
import { ThemeToggleButton } from '@/features/theme-toggle';

export const MainLayout: FC = () => {
  return (
    <>
      <Header actions={<ThemeToggleButton />} />
      <main className='mt-4 h-[calc(100vh-var(--header-height)-16px))]'>
        <Outlet />
      </main>
    </>
  );
};
