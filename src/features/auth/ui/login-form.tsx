import { type FC, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';

import { isErrorWithMessage } from '@/shared/api/types';
import { cn } from '@/shared/lib/cn';
import { ROUTES } from '@/shared/routes';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { PasswordInput } from '@/shared/ui/password-input';
import { Spinner } from '@/shared/ui/spinner';

import { useLoginMutation } from '../model/api';
import {
  AUTH_REQUEST_ERROR_MESSAGES,
  LOGIN_FORM_ERROR_MESSAGES
} from '../model/constants';

interface LoginFormProps {
  className?: string;
}

export const LoginForm: FC<LoginFormProps> = ({ className }) => {
  const [fieldsErrors, setFieldsErrors] = useState<{
    username: null | string;
    password: null | string;
  }>({ username: null, password: null });

  const formRef = useRef<HTMLFormElement>(null);

  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get('username')?.toString() || '';
    const password = formData.get('password')?.toString() || '';

    if (!username) {
      setFieldsErrors((prev) => ({
        ...prev,
        username: LOGIN_FORM_ERROR_MESSAGES.invalid_username
      }));
    } else {
      setFieldsErrors((prev) => ({
        ...prev,
        username: null
      }));
    }

    if (!password) {
      setFieldsErrors((prev) => ({
        ...prev,
        password: LOGIN_FORM_ERROR_MESSAGES.invalid_password
      }));
    } else {
      setFieldsErrors((prev) => ({
        ...prev,
        password: null
      }));
    }

    if (!username || !password) return;

    login({ username, password })
      .unwrap()
      .then(() => {
        formRef.current?.reset();
        navigate(ROUTES.TODOS);
      })
      .catch((error) => {
        if (isErrorWithMessage(error)) {
          if (error.status === 400) {
            toast.error(AUTH_REQUEST_ERROR_MESSAGES[error.status]);
          }
          if (error.status === 401) {
            toast.error(AUTH_REQUEST_ERROR_MESSAGES[error.status]);
          }
        }
      })
      .finally(() => {
        setFieldsErrors({ username: null, password: null });
      });
  };

  return (
    <div
      className={cn(
        className,
        'bg-card w-full max-w-lg rounded-lg border p-4 pb-10 shadow-2xl'
      )}
    >
      <form
        ref={formRef}
        onSubmit={handleOnSubmit}
        className='flex flex-col gap-6'
      >
        <div className='space-y-2 text-center'>
          <h1 className='text-2xl font-bold'>Вход</h1>
          <p className='text-muted-foreground'>Войдите в свой аккаунт</p>
        </div>
        <div className='flex flex-col gap-2'>
          <Label
            htmlFor='username'
            className={cn({ ['text-destructive']: fieldsErrors.username })}
          >
            Логин *
          </Label>
          <Input
            name='username'
            type='text'
            placeholder='Введите логин'
            className={cn({ ['border-destructive']: fieldsErrors.username })}
          />
          {fieldsErrors.username && (
            <span className='text-destructive -mt-2 ml-2 text-sm'>
              {fieldsErrors.username}
            </span>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <Label
            htmlFor='password'
            className={cn({ ['text-destructive']: fieldsErrors.password })}
          >
            Пароль *
          </Label>
          <PasswordInput
            name='password'
            placeholder='Введите пароль'
            containerClassName={cn({
              ['border-destructive']: fieldsErrors.password
            })}
          />
          {fieldsErrors.password && (
            <span className='text-destructive -mt-2 ml-2 text-sm'>
              {fieldsErrors.password}
            </span>
          )}
        </div>
        <Button type='submit' disabled={isLoading}>
          <span> Войти</span>
          {isLoading && <Spinner />}
        </Button>
        <div className='flex justify-center'>
          <div className='space-x-1 text-sm'>
            <span className='text-muted-foreground'>Нет аккаунта?</span>
            <Link
              to={ROUTES.REGISTER}
              className='text-primary font-medium hover:underline'
            >
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
