import { type FC } from 'react';
import { Moon, Sun } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';

import { useTheme } from '../model/use-theme';

export type ThemeToggleButtonProps = {
  className?: string;
};

export const ThemeToggleButton: FC<ThemeToggleButtonProps> = ({
  className
}) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={toggleTheme}
      className={cn(
        className,
        'hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring h-9 w-9 rounded-full transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 md:h-10 md:w-10'
      )}
      aria-label='Toggle theme'
    >
      <Sun className='size-5 scale-100 rotate-0 transition-all md:h-5 md:w-5 dark:scale-0 dark:-rotate-90' />
      <Moon className='absolute size-5 scale-0 rotate-90 transition-all md:h-5 md:w-5 dark:scale-100 dark:rotate-0' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
};
