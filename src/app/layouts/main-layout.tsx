import { type FC } from 'react';
import { Outlet } from 'react-router';

import { Header } from '@/features/header';
import { ThemeToggleButton } from '@/features/theme-toggle';

export const MainLayout: FC = () => {
  return (
    <>
      <Header actions={<ThemeToggleButton />} />
      <main>
        <Outlet />
      </main>
    </>
  );
};
