import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';

export const useNotesActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actionCreators.NotesActionCreators, dispatch);
};

export const useAuthAction = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actionCreators.AuthActionCreators, dispatch);
};
