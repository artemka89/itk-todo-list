import { type FC } from 'react';

import { useMeQuery } from '@/features/auth';
import { cn } from '@/shared/lib/cn';
import { Container } from '@/shared/ui/container';

interface HeaderProps {
  actions: React.ReactNode;
  className?: string;
}

export const Header: FC<HeaderProps> = ({ actions, className }) => {
  const { data: user } = useMeQuery(null);

  return (
    <header
      className={cn(
        className,
        'border-border bg-secondary flex h-[var(--header-height)] items-center border-b shadow-lg'
      )}
    >
      <Container className='flex flex-1 items-center justify-between gap-4 px-4'>
        <div className='text-primary text-2xl font-bold max-sm:text-lg'>
          Список задач
        </div>
        <div className='flex items-center gap-4'>
          <div className='font-medium capitalize max-sm:text-sm'>
            {user?.username}
          </div>
          <div className='flex items-center gap-2'>{actions}</div>
        </div>
      </Container>
    </header>
  );
};
