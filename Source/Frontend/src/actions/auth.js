import { LOGIN_LOADING, LOGIN_SUCCESS, LOGOUT } from './actionTypes';
import { showError } from './alert';
import makeActionCreator from './makeActionCreator';
import config from '../config.js';

export const login = (user) => {
  return (dispatch) => {
    dispatch(loginLoading(true));

    fetch(`${config.endpoint}/token`, {
      body: `username=${user.username}&password=${user.password}&role=Admin&phase=1`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST"
    })
      .then(res => res.json())
      .then(res => {
        dispatch(loginLoading(false));
        dispatch(loginSuccess(res));
      })
      .catch(error => {
        dispatch(loginLoading(false));
        dispatch(showError(error.toString()));
      });
  }
}

export const loginLoading = makeActionCreator(LOGIN_LOADING, 'isLoading');
export const loginSuccess = makeActionCreator(LOGIN_SUCCESS, 'user');
export const logout = makeActionCreator(LOGOUT);