import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { baseApi } from '@/shared/api/base-api';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(baseApi.middleware)
});

setupListeners(store.dispatch);
