import { type ChangeEvent, type FC, useState } from 'react';
import { Plus } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

import { useCreateTodoMutation } from '../model/api';
import { MIN_TODO_LENGTH } from '../model/constants';

interface AddTaskFieldProps {
  className?: string;
}

export const AddTaskField: FC<AddTaskFieldProps> = ({ className }) => {
  const [inputValue, setInputValue] = useState('');

  const [createTodo, { isLoading }] = useCreateTodoMutation();

  const handleChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleCreateTodo = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue.length < MIN_TODO_LENGTH) return;
    createTodo({ title: trimmedValue });
    setInputValue('');
  };

  return (
    <div className={cn(className, 'relative')}>
      <Input
        data-testid='todo-text'
        type='text'
        value={inputValue}
        onChange={handleChangeInputValue}
        onKeyDown={(event) => event.key === 'Enter' && handleCreateTodo()}
        placeholder='Введите название задачи'
        className='h-14 rounded-xl pr-14 pl-6 leading-14 md:text-xl'
      />
      <Button
        data-testid='add-todo'
        size='icon'
        onClick={handleCreateTodo}
        disabled={inputValue.length < MIN_TODO_LENGTH || isLoading}
        className='absolute top-1/2 right-3 -translate-y-1/2 rounded-full'
      >
        <Plus className='size-6' />
      </Button>
    </div>
  );
};
