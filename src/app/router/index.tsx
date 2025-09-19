import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <div>App</div>
  },

  {
    path: '*',
    element: <div>404</div>
  }
]);
