import { loginSuccess, loginLoading, logout, tokenValidated } from '../../actions/auth';
import { LOGIN_LOADING, LOGIN_SUCCESS, LOGOUT, TOKEN_VALIDATED } from '../../actions/actionTypes';

describe('authActions', () => {
  describe('loginSuccess', () => {
    it('should return LOGIN_SUCCESS action object', () => {
      // Arrange
      const user = { x: 'y' };

      // Act
      const actionResult = loginSuccess(user);

      // Assert
      expect(actionResult).toEqual({
        type: LOGIN_SUCCESS,
        user
      });
    });
  });

  describe('loginLoading', () => {
    it('should return LOGIN_LOADING action object', () => {
      // Arrange 
      const isLoading = false;

      // Act
      const actionResult = loginLoading(isLoading);

      // Assert
      expect(actionResult).toEqual({
        type: LOGIN_LOADING,
        isLoading
      });
    });
  });

  describe('logout', () => {
    it('should return LOGOUT action object', () => {
      // Arrange & Act
      const actionResult = logout();

      // Assert
      expect(actionResult).toEqual({ type: LOGOUT });
    });
  });

  describe('tokenValidated', () => {
    it('should return TOKEN_VALIDATED action object', () => {
      // Arrange & Act
      const actionResult = tokenValidated('x', '1');

      // Assert
      expect(actionResult).toEqual({
        type: TOKEN_VALIDATED,
        accessToken: 'x',
        phase: '1',
      });
    });
  });
});