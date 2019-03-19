import reducer from '../../reducers/auth';
import { loginLoading, loginSuccess, loginError, logout } from '../../actions/authActions';

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  isFailed: false,
  error: '',
  username: '',
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
    expect(state).toEqual({
      isLoading: true,
      isAuthenticated: false,
      isFailed: false,
      error: '',
      username: '',
    });
  });

  it('should handle LOGIN_SUCCESS action', () => {
    // Arrange & Act
    const action = loginSuccess({ username: 'x' });
    const state = reducer(initialState, action);

    // Assert
    expect(state).toEqual({
      isLoading: false,
      isAuthenticated: true,
      isFailed: false,
      error: '',
      username: 'x',
    });
  });

  it('should handle LOGIN_ERROR action', () => {
    // Arrange & Act
    const action = loginError('x');
    const state = reducer(initialState, action);

    // Assert
    expect(state).toEqual({
      isLoading: false,
      isAuthenticated: false,
      isFailed: true,
      error: 'x',
      username: '',
    });
  });

  it('should handle LOGOUT action', () => {
    // Arrange & Act
    const action = logout();
    const state = reducer(initialState, action);

    // Assert
    expect(state).toEqual(initialState);
  });
});