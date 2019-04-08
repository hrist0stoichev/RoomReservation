import { LOGIN_LOADING, LOGIN_SUCCESS, LOGOUT, TOKEN_VALIDATED } from '../actions/actionTypes';

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
        ...action.user,
        isAuthenticated: true,
        username: action.user.userName,
        accessToken: action.user.access_token,
        userRole: action.user.userRole || 'Student',
        phase: action.user.phase
      };
    case TOKEN_VALIDATED: {
      return {
        ...state,
        isAuthenticated: true,
        accessToken: action.accessToken,
        phase: action.phase,
        userRole: 'Admin' // TODO:: GET ROLE FROM API
      };
    }
    case LOGOUT:
      localStorage.removeItem('token');
      return initialState;
    default:
      return state;
  }
};

export default auth;