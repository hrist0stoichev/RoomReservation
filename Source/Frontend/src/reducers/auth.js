import { LOGIN_LOADING, LOGIN_SUCCESS, LOGOUT } from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  username: '',
  accessToken: '',
  userRole: '',
  phase: '',
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        username: action.user.userName,
        accessToken: action.user.access_token,
        userRole: action.user.userRole,
        phase: action.user.phase
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default auth;