import { combineReducers } from 'redux';
import authReducer from './authReducer';
import notesReducer from './noteReducer';

const reducers = combineReducers({
  notes: notesReducer,
  auth: authReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
