import { RootState } from '../reducers';
import { createSelector } from '@reduxjs/toolkit';

export const selectAuthState = (state: RootState) => state.auth;

export const selectAuthUser = createSelector(
  selectAuthState,
  (state) => state.user
);
