import User from '../../models/User';
import { AuthActionType as ActionType } from '../action-types';

interface CreateUserAction {
  type: ActionType.CREATE_USER;
}

interface CreateUserSuccessAction {
  type: ActionType.CREATE_USER_SUCCESS;
  payload: User;
}

interface CreateUserErrorAction {
  type: ActionType.CREATE_USER_ERROR;
  payload: string;
}

interface LoginUserAction {
  type: ActionType.LOGIN_USER;
}

interface LoginUserSuccessAction {
  type: ActionType.LOGIN_USER_SUCCESS;
  payload: User;
}

interface LoginUserErrorAction {
  type: ActionType.LOGIN_USER_ERROR;
  payload: string;
}

interface CheckIfUserLoggedAction {
  type: ActionType.CHECK_IF_USER_LOGGED;
}

interface CheckIfUserLoggedSuccessAction {
  type: ActionType.CHECK_IF_USER_LOGGED_SUCCESS;
  payload: User;
}

interface CheckIfUserLoggedFailAction {
  type: ActionType.CHECK_IF_USER_LOGGED_FAIL;
}

interface LogoutUserAction {
  type: ActionType.LOGOUT_USER;
}

interface LogoutUserSuccessAction {
  type: ActionType.LOGOUT_USER_SUCCESS;
}

interface LogoutUserErrorAction {
  type: ActionType.LOGOUT_USER_ERROR;
  payload: string;
}

export type Action =
  | CreateUserAction
  | CreateUserSuccessAction
  | CreateUserErrorAction
  | LoginUserAction
  | LoginUserSuccessAction
  | LoginUserErrorAction
  | CheckIfUserLoggedAction
  | CheckIfUserLoggedSuccessAction
  | CheckIfUserLoggedFailAction
  | LogoutUserAction
  | LogoutUserSuccessAction
  | LogoutUserErrorAction;
