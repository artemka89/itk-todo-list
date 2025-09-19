import { type FC } from 'react';
import { useQueryState } from 'nuqs';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';

import { useGetTodosQuery } from '../model/api';
import { TOTO_FILTERS } from '../model/constants';

interface TodoFiltersProps {
  className?: string;
}

export const TodoFilters: FC<TodoFiltersProps> = ({ className }) => {
  const [filter, setFilter] = useQueryState('filter', { defaultValue: 'all' });

  const { data } = useGetTodosQuery();

  return (
    <div className={cn(className, 'flex gap-x-4')}>
      {TOTO_FILTERS.map((item) => (
        <Button
          data-testid={`filter-button-${item.value}`}
          key={item.value}
          size='sm'
          variant={
            item.value === filter && data?.length ? 'default' : 'outline'
          }
          onClick={() => setFilter(item.value)}
          disabled={!data?.length}
          className='border border-transparent'
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
};
