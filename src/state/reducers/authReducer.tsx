import User from '../../models/User';
import { AuthAction as Action } from '../actions';
import { AuthActionType as ActionType } from '../action-types';

export interface AuthState {
  inProgres: boolean;
  error: string | null;
  user: User | null;
}

const initialAuthState: AuthState = {
  inProgres: false,
  error: null,
  user: null,
};

const authReducer = (
  state: AuthState = initialAuthState,
  action: Action
): AuthState => {
  switch (action.type) {
    case ActionType.CREATE_USER:
      return {
        inProgres: true,
        error: null,
        user: null,
      };
    case ActionType.CREATE_USER_SUCCESS:
      return {
        inProgres: false,
        error: null,
        user: action.payload,
      };
    case ActionType.CREATE_USER_ERROR:
      return {
        inProgres: false,
        error: action.payload,
        user: null,
      };
    case ActionType.LOGIN_USER:
      return {
        inProgres: true,
        error: null,
        user: null,
      };
    case ActionType.LOGIN_USER_SUCCESS:
      return {
        inProgres: false,
        error: null,
        user: action.payload,
      };

    case ActionType.LOGIN_USER_ERROR:
      return {
        inProgres: false,
        error: action.payload,
        user: null,
      };
    case ActionType.CHECK_IF_USER_LOGGED:
      return {
        inProgres: true,
        error: null,
        user: state.user,
      };
    case ActionType.CHECK_IF_USER_LOGGED_FAIL:
      return {
        inProgres: false,
        error: null,
        user: null,
      };
    case ActionType.CHECK_IF_USER_LOGGED_SUCCESS:
      return {
        inProgres: false,
        error: null,
        user: action.payload,
      };
    case ActionType.LOGOUT_USER:
      return {
        inProgres: true,
        error: state.error,
        user: state.user,
      };
    case ActionType.LOGOUT_USER_SUCCESS:
      return {
        inProgres: false,
        error: null,
        user: null,
      };
    case ActionType.LOGOUT_USER_ERROR:
      return {
        inProgres: false,
        error: action.payload,
        user: state.user,
      };
    default:
      return state;
  }
};

export default authReducer;
