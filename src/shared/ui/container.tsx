import { type FC } from 'react';

import { cn } from '@/shared/lib/cn';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={cn(className, 'mx-auto max-w-7xl px-4 max-md:px-2')}>
      {children}
    </div>
  );
};
