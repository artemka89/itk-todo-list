import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import {
  bindActionCreators,
  createSlice,
  type CreateSliceOptions,
  type SliceCaseReducers
} from '@reduxjs/toolkit';

export function buildSlice<
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string = string
>(options: CreateSliceOptions<State, CaseReducers, Name>) {
  const slice = createSlice(options);

  const useActions = (): typeof slice.actions => {
    const dispatch = useDispatch();

    return useMemo(
      () => bindActionCreators(slice.actions, dispatch),
      [dispatch]
    );
  };

  return {
    ...slice,
    useActions
  };
}
