export enum ActionType {
  CREATE_USER = 'create_user',
  CREATE_USER_SUCCESS = 'create_user_success',
  CREATE_USER_ERROR = 'create_user_error',

  LOGIN_USER = 'login_user',
  LOGIN_USER_SUCCESS = 'login_user_success',
  LOGIN_USER_ERROR = 'login_user_error',

  LOGOUT_USER = 'logout_user',
  LOGOUT_USER_SUCCESS = 'logout_user_success',
  LOGOUT_USER_ERROR = 'logout_user_error',

  CHECK_IF_USER_LOGGED = 'check_if_user_logged',
  CHECK_IF_USER_LOGGED_SUCCESS = 'check_if_user_logged_success',
  CHECK_IF_USER_LOGGED_FAIL = 'check_if_user_logged_fail',
}
