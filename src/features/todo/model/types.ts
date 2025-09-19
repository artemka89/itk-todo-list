export interface TodoItemType {
  id: number;
  title: string;
  completed: boolean;
}

export interface CreateTodo {
  title: string;
}

export type TodoFilter = 'all' | 'active' | 'completed';
