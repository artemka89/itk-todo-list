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
import type { RefreshTokensRequest } from './types';

const mutex = new Mutex();

export const baseQuery = fetchBaseQuery({
  baseUrl: API_URL
});

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  if (tokenManager.isExpired && !mutex.isLocked()) {
    const release = await mutex.acquire();

    try {
      const response = await baseQuery(
        {
          url: API_ROUTES.REFRESH_TOKEN,
          method: 'POST',
          body: { refreshToken: tokenManager.refreshToken }
        },
        api,
        extraOptions
      );

      const tokens = response.data as RefreshTokensRequest;

      if (!tokens) {
        tokenManager.clearToken();
      }

      tokenManager.accessToken = tokens.accessToken;
      tokenManager.refreshToken = tokens.refreshToken;
    } finally {
      release();
    }
  } else {
    await mutex.waitForUnlock();
  }

  const requestHeaders =
    args.url !== API_ROUTES.LOGIN && args.url !== API_ROUTES.REGISTER
      ? { Authorization: `Bearer ${tokenManager.accessToken}` }
      : {};

  return baseQuery({ ...args, headers: requestHeaders }, api, extraOptions);
};
