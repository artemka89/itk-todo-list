import { baseApi } from '@/shared/api/base-api';
import { tokenManager } from '@/shared/lib/token-manager';

import type { Credentials, LoginRequest, User } from './types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<void, Credentials>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body
      })
    }),
    login: builder.mutation<LoginRequest, Credentials>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          tokenManager.accessToken = data.accessToken;
          tokenManager.refreshToken = data.refreshToken;
        } catch (error) {
          console.error('Ошибка запроса:', error);
        }
      }
    }),
    me: builder.query<User, void>({
      query: () => ({
        url: '/auth/me',
        method: 'GET'
      }),
      transformResponse: (response: { user: User }) => response.user
    })
  })
});

export const { useLoginMutation, useRegisterMutation, useMeQuery } = authApi;
