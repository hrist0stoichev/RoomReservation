import reducer from '../../reducers/auth';
import { loginLoading, loginSuccess, tokenValidated, logout } from '../../actions/auth';

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  accessToken: '',
  username: '',
  phase: '',
  userRole: '',
};

describe('authReducer', () => {
  it('should return initial state', () => {
    // Arrange & Act
    const state = reducer(undefined, {});

    // Assert
    expect(state).toEqual(initialState);
  });

  it('should handle LOGIN_LOADING action', () => {
    // Arrange & Act
    const action = loginLoading(true);
    const state = reducer(initialState, action);

    // Assert
    expect(state.isLoading).toEqual(true);
  });

  it('should handle LOGIN_SUCCESS action', () => {
    // Arrange
    const user = {
      userName: 'x',
      access_token: 'y',
      userRole: 'z',
      phase: 'u',
    };
    const action = loginSuccess(user);
    
    // Act
    const state = reducer(initialState, action);

    // Assert
    expect(state.isAuthenticated).toEqual(true);
    expect(state.username).toEqual('x');
    expect(state.accessToken).toEqual('y');
    expect(state.userRole).toEqual('z');
    expect(state.phase).toEqual('u');
  });

  it('should handle LOGOUT action', () => {
    // Arrange & Act
    const action = logout();
    const state = reducer(initialState, action);

    // Assert
    expect(state).toEqual(initialState);
  });

  it('should handle TOKEN_VALIDATED action', () => {
    // Arrange & Act
    const action = tokenValidated('x', '1');
    const state = reducer(initialState, action);

    // Assert
    expect(state.accessToken).toEqual('x');
    expect(state.userRole).toEqual('1');
  });
});