import { LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS, LOGOUT } from './actionTypes';
import makeActionCreator from './makeActionCreator';

export const login = (user) => {
  return (dispatch) => {
    dispatch(loginLoading(true));

    fetch('/login')
      .then(res => {
        dispatch(loginLoading(false));
        if (res.code === 200) {
          dispatch(loginSuccess(res.user));
        } else {
          dispatch(loginError(res.userMessage));
        }
      })
      .catch(error => {
        dispatch(loginLoading(false));
        dispatch(loginError(error));
      });
  }
}

export const loginLoading = makeActionCreator(LOGIN_LOADING, 'isLoading');
export const loginSuccess = makeActionCreator(LOGIN_SUCCESS, 'user');
export const loginError = makeActionCreator(LOGIN_ERROR, 'error');
export const logout = makeActionCreator(LOGOUT);