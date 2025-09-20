import { type FC, useRef, useState } from 'react';
import { Check, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';

import { useDeleteTodoMutation, useUpdateTodoMutation } from '../model/api';
import { MIN_TODO_LENGTH } from '../model/constants';
import type { TodoItemType } from '../model/types';

interface TodoItemProps {
  item: TodoItemType;
  className?: string;
}

export const TodoItem: FC<TodoItemProps> = ({ item, className }) => {
  const [title, setSetTitle] = useState(item.title);
  const [isEditMode, setIsEditMode] = useState(false);

  const editValueRef = useRef<HTMLInputElement>(null);

  const [deleteTodo, { isLoading: isDeleting }] = useDeleteTodoMutation();
  const [updateTodo, { isLoading: isEditing }] = useUpdateTodoMutation();

  const updateTitle = () => {
    if (title.length < MIN_TODO_LENGTH) {
      toast.error('Название задачи должно быть больше 2 символов');
      return;
    }

    if (title == item.title) {
      setIsEditMode(false);
      return;
    }

    updateTodo({ ...item, title })
      .unwrap()
      .catch(() => {
        toast.error(
          'Произошла ошибка при обновлении задачи, попробуйте еще раз'
        );
      });

    setIsEditMode(false);
  };

  const handleToggleCompleted = () => {
    updateTodo({ ...item, completed: !item.completed })
      .unwrap()
      .catch(() => {
        toast.error(
          'Произошла ошибка при обновлении задачи, попробуйте еще раз'
        );
      });
  };

  const handleToggleEdit = () => {
    if (isEditMode) {
      updateTitle();
    } else {
      setIsEditMode(true);
      setSetTitle(item.title);
    }
  };

  const handleDelete = () => {
    deleteTodo({ id: item.id })
      .unwrap()
      .catch(() => {
        toast.error('Произошла ошибка при удалении задачи, попробуйте еще раз');
      });
  };

  return (
    <li className={cn(className, 'bg-background flex rounded-md border p-3')}>
      <div
        className={cn(
          'relative flex flex-1 items-center',
          'before:bg-primary/70 before:absolute before:right-2 before:-left-1 before:h-1 before:origin-left before:scale-x-0 before:rounded-full before:transition-transform before:duration-300',
          {
            ['before:scale-x-100']: item.completed && !isEditMode
          }
        )}
      >
        {isEditMode ? (
          <input
            ref={editValueRef}
            type='text'
            value={title}
            onChange={(e) => setSetTitle(e.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && updateTitle()}
            autoFocus={isEditMode}
            className='border-primary mr-2 field-sizing-content w-full border-b pb-1 text-lg outline-none'
          />
        ) : (
          <p className='pb-1 text-lg'>{title}</p>
        )}
      </div>
      <div className='flex items-center gap-2'>
        <Checkbox
          checked={item.completed}
          onCheckedChange={handleToggleCompleted}
          disabled={isEditing}
          className={cn(
            'dark:data-[state=checked]:border-primary dark:bg-border bg-muted dark:data-[state=checked]:bg-secondary dark:data-[state=checked]:text-primary size-6 rounded-full'
          )}
        />
        <Button
          size='icon'
          variant='outline'
          onClick={handleToggleEdit}
          disabled={isEditing && isEditMode}
          className='hover:text-primary size-9 rounded-full border-0'
        >
          {isEditMode ? <Check /> : <Pencil />}
        </Button>
        <Button
          size='icon'
          variant='outline'
          onClick={handleDelete}
          disabled={isDeleting}
          className='hover:text-destructive size-9 rounded-full border-0'
        >
          <Trash2 />
        </Button>
      </div>
    </li>
  );
};
