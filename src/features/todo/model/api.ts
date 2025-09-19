import { baseApi } from '@/shared/api/base-api';
import { API_ROUTES } from '@/shared/routes';

import type { CreateTodo, TodoItemType } from './types';

export const todoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query<TodoItemType[], void>({
      query: () => ({
        url: API_ROUTES.TODOS,
        method: 'GET'
      }),
      providesTags: ['todos']
    }),
    createTodo: builder.mutation<TodoItemType, CreateTodo>({
      query: (body) => ({
        url: API_ROUTES.TODOS,
        method: 'POST',
        body
      }),
      invalidatesTags: ['todos']
    }),
    updateTodo: builder.mutation<void, TodoItemType>({
      query: ({ id, ...body }) => ({
        url: `${API_ROUTES.TODOS}/${id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['todos']
    }),
    deleteTodo: builder.mutation<void, { id: number }>({
      query: (params) => ({
        url: `${API_ROUTES.TODOS}/${params.id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['todos']
    })
  })
});

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation
} = todoApi;
