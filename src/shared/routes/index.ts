import 'react-router';

export const API_ROUTES = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  REFRESH_TOKEN: '/auth/refresh',
  ME: '/auth/me',
  TODOS: '/todos'
} as const;

export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  TODOS: '/todos',
  TODO: '/todo/:id'
} as const;

export type PathParams = {
  [ROUTES.TODO]: {
    id: string;
  };
};

declare module 'react-router' {
  interface Register {
    pages: {
      [K in keyof PathParams]: {
        params: PathParams[K];
      };
    };
  }
}
