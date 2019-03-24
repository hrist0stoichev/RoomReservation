import { SHOW_ERROR, HIDE_ERROR, SHOW_ALERT, HIDE_ALERT } from '../actions/actionTypes';

const initialState = {
  error: false,
  errorMessage: '',
  alert: false,
  alertMessage: '',
};

const alert = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ERROR:
      return {
        ...state,
        error: true,
        errorMessage: action.message,
      };
    case SHOW_ALERT:
      return {
        ...state,
        alert: true,
        alertMessage: action.message,
      };
    case HIDE_ERROR:
      return {
        ...state,
        error: false,
        errorMessage: '',
      };
    case HIDE_ALERT:
      return {
        ...state,
        alert: false,
        alertMessage: '',
      }
    default:
      return initialState;
  }
};

export default alert;