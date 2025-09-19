import { type FC } from 'react';

import { Container } from '@/shared/ui/container';

import { AddTaskField } from './add-task-field';
import { ScrollArea } from './scroll-area';
import { TodoFilters } from './todo-filters';
import { TodoItemsList } from './todo-list';

export const TodosPage: FC = () => {
  return (
    <Container className='flex h-full flex-col gap-4 pb-4'>
      <AddTaskField />
      <div className='border-border bg-secondary flex flex-1 flex-col rounded-md px-1 py-4 shadow-md'>
        <TodoFilters className='mb-4 w-full justify-center' />
        <ScrollArea className='h-full w-full px-3'>
          <TodoItemsList className='absolute inset-0' />
        </ScrollArea>
      </div>
    </Container>
  );
};
