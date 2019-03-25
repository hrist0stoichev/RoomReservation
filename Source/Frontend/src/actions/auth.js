import { LOGIN_LOADING, LOGIN_SUCCESS, LOGOUT, TOKEN_VALIDATED } from './actionTypes';
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
        localStorage.setItem('token', res.access_token);
      })
      .catch(error => {
        dispatch(loginLoading(false));
        dispatch(showError(error.toString()));
      });
  }
}

export const authenticateWithToken = (token) => {
  return (dispatch) => {
    fetch(`${config.endpoint}/campaigns`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => res.text())
      .then((res) => {
        if (res !== '') {
          dispatch(tokenValidated(token, parseInt(res)));
        } else {
          dispatch(logout());
        }
      })
      .catch(() => dispatch(logout()));
  };
};

export const loginLoading = makeActionCreator(LOGIN_LOADING, 'isLoading');
export const loginSuccess = makeActionCreator(LOGIN_SUCCESS, 'user');
export const logout = makeActionCreator(LOGOUT);
export const tokenValidated = makeActionCreator(TOKEN_VALIDATED, 'accessToken', 'phase');