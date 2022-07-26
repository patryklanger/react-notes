import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../reducers';

export const selectNoteState = (state: RootState) => state.notes;

export const selectNotes = createSelector(
  selectNoteState,
  (state) => state.data
);
