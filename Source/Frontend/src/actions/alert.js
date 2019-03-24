import { SHOW_ALERT, HIDE_ALERT, SHOW_ERROR, HIDE_ERROR } from './actionTypes';
import makeActionCreator from './makeActionCreator';

export const showError = makeActionCreator(SHOW_ERROR, 'message');
export const showAlert = makeActionCreator(SHOW_ALERT, 'message');
export const hideError = makeActionCreator(HIDE_ERROR);
export const hideAlert = makeActionCreator(HIDE_ALERT);