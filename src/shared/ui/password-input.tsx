import { type ComponentProps, type FC, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { cn } from '@/shared/lib/cn';

import { Input } from './input';

interface PasswordInputProps extends Omit<ComponentProps<'input'>, 'type'> {
  className?: string;
  containerClassName?: string;
}

export const PasswordInput: FC<PasswordInputProps> = ({
  className,
  containerClassName,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cn(containerClassName, 'relative')}>
      <Input
        type={showPassword ? 'text' : 'password'}
        className={className}
        {...props}
      />
      <button
        type='button'
        onClick={() => setShowPassword(!showPassword)}
        className='text-muted-foreground hover:text-foreground absolute top-0 right-0 h-full cursor-pointer px-3'
      >
        {showPassword ? (
          <EyeOff className='h-4 w-4' />
        ) : (
          <Eye className='h-4 w-4' />
        )}
      </button>
    </div>
  );
};
