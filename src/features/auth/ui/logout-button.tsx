import { type FC } from 'react';
import { useNavigate } from 'react-router';

import { cn } from '@/shared/lib/cn';
import { ROUTES } from '@/shared/routes';
import { Button } from '@/shared/ui/button';

import { useLogoutMutation } from '../model/api';

interface LogoutButtonProps {
  className?: string;
}

export const LogoutButton: FC<LogoutButtonProps> = ({ className }) => {
  const [logout, { isLoading }] = useLogoutMutation();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
      .unwrap()
      .then(() => {
        navigate(ROUTES.LOGIN);
      });
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={isLoading}
      className={cn(className)}
    >
      Выйти
    </Button>
  );
};
