import { type FC } from 'react';
import { useQueryState } from 'nuqs';

import { cn } from '@/shared/lib/cn';

import { useGetTodosQuery } from '../model/api';

import { TodoItem } from './todo-item';

interface TodoItemsListProps {
  className?: string;
}

export const TodoItemsList: FC<TodoItemsListProps> = ({ className }) => {
  const [filter] = useQueryState('filter');

  const { data: items = [], isLoading } = useGetTodosQuery();

  const filteredItems = items.filter((item) => {
    if (filter === 'active') return !item.completed;
    if (filter === 'completed') return item.completed;
    return true;
  });

  return (
    <ul className={cn(className, 'flex flex-col gap-2')}>
      {filteredItems.length === 0 && !isLoading ? (
        <div className='text-muted-foreground mt-10 text-center text-2xl font-semibold'>
          Список задач пуст
        </div>
      ) : (
        filteredItems.map((item) => <TodoItem key={item.id} item={item} />)
      )}
    </ul>
  );
};
