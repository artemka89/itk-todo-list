import { baseApi } from '@/shared/api/base-api';
import type { TokensResponse } from '@/shared/api/types';
import { tokenManager } from '@/shared/lib/token-manager';
import { API_ROUTES } from '@/shared/routes';

import type { Credentials, User } from './types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<void, Credentials>({
      query: (body) => ({
        url: API_ROUTES.REGISTER,
        method: 'POST',
        body
      })
    }),
    login: builder.mutation<TokensResponse, Credentials>({
      query: (body) => ({
        url: API_ROUTES.LOGIN,
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
    me: builder.query<User, null>({
      query: () => ({
        url: API_ROUTES.ME,
        method: 'GET'
      }),
      transformResponse: (response: { user: User }) => response.user
    }),
    logout: builder.mutation<{ success: boolean }, void>({
      queryFn: (_arg, { dispatch }) => {
        tokenManager.clearToken();
        dispatch(authApi.util.resetApiState());
        return { data: { success: true } };
      }
    })
  })
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useMeQuery,
  useLogoutMutation
} = authApi;
