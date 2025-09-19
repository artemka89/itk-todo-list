import { useDispatch, useSelector } from 'react-redux';

import type { store } from '@/app/store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export { buildSelector } from './build-selector';
export { buildSlice } from './build-slice';
