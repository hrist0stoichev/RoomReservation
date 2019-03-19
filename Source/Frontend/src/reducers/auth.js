import { LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS, LOGOUT } from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  isFailed: false,
  error: '',
  username: '',
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
        isFailed: false,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isFailed: true,
        error: action.error,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        username: action.user.username,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default auth;