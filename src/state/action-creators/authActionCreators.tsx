import { Dispatch } from 'redux';
import { AuthAction as Action } from '../actions';
import { AuthActionType as ActionType } from '../action-types';
import { getCurrentUser, login, logout, signUp } from './../../services/auth';

export const createUser = (email: string, password: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.CREATE_USER,
    });
    try {
      const user = await signUp(email, password);
      dispatch({
        type: ActionType.CREATE_USER_SUCCESS,
        payload: user,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.CREATE_USER_ERROR,
        payload: error.message as string,
      });
    }
  };
};

export const loginUser = (email: string, password: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.LOGIN_USER,
    });
    try {
      const user = await login(email, password);
      dispatch({
        type: ActionType.LOGIN_USER_SUCCESS,
        payload: user,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.LOGIN_USER_ERROR,
        payload: error.message as string,
      });
    }
  };
};

export const logoutUser = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.LOGOUT_USER,
    });
    try {
      await logout();
    } catch (error: any) {
      dispatch({
        type: ActionType.LOGOUT_USER_ERROR,
        payload: error.message as string,
      });
    }
  };
};

export const checkIfUserLogged = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.CHECK_IF_USER_LOGGED,
    });
    const user = await getCurrentUser();
    if (!user) dispatch({ type: ActionType.CHECK_IF_USER_LOGGED_FAIL });
    else
      dispatch({
        type: ActionType.CHECK_IF_USER_LOGGED_SUCCESS,
        payload: user,
      });
  };
};
