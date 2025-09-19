import {
  type ComponentProps,
  type FC,
  useLayoutEffect,
  useRef,
  useState
} from 'react';
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

  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  useLayoutEffect(() => {
    if (inputRef.current) {
      const input = inputRef.current;
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    }
  }, [showPassword]);

  return (
    <div className={cn(containerClassName, 'relative')}>
      <Input
        ref={inputRef}
        type={showPassword ? 'text' : 'password'}
        autoComplete='current-password'
        className={className}
        {...props}
      />
      <button
        type='button'
        onClick={handleToggleShowPassword}
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
