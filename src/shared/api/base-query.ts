import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';

import { tokenManager } from '../lib/token-manager';
import { API_ROUTES } from '../routes';

import { API_URL } from './constants';
import type { TokensResponse } from './types';

const mutex = new Mutex();

export const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { endpoint }) => {
    const token = localStorage.getItem('access_token');
    const isAuthEndpoint = (
      [
        API_ROUTES.LOGIN,
        API_ROUTES.REGISTER,
        API_ROUTES.REFRESH_TOKEN
      ] as string[]
    ).includes(endpoint);

    if (token && !isAuthEndpoint) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  if (tokenManager.isExpired && !mutex.isLocked()) {
    const release = await mutex.acquire();

    try {
      const refreshResponse = await baseQuery(
        {
          ...args,
          url: API_ROUTES.REFRESH_TOKEN,
          method: 'POST',
          body: { refreshToken: tokenManager.refreshToken }
        },
        api,
        extraOptions
      );

      if (refreshResponse.error) {
        tokenManager.clearToken();
      }

      const tokens = refreshResponse.data as TokensResponse | undefined;
      if (tokens) {
        tokenManager.accessToken = tokens.accessToken;
        tokenManager.refreshToken = tokens.refreshToken;
      } else {
        tokenManager.clearToken();
        return {
          error: {
            status: 401,
            data: 'Invalid token response'
          } as FetchBaseQueryError
        };
      }
    } finally {
      release();
    }
  } else {
    await mutex.waitForUnlock();
  }

  return baseQuery(args, api, extraOptions);
};
