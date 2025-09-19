import type { TodoFilter } from './types';

export const MIN_TODO_LENGTH = 2;

export const TOTO_FILTERS: { value: TodoFilter; label: string }[] = [
  {
    value: 'all',
    label: 'Все'
  },
  {
    value: 'active',
    label: 'Активные'
  },
  {
    value: 'completed',
    label: 'Выполненные'
  }
];
