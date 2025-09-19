import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from './base-query';

export const baseApi = createApi({
  reducerPath: 'todos/api',
  tagTypes: ['todos'],
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({})
});
