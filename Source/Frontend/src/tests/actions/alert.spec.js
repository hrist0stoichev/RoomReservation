import { showError, hideError, showAlert, hideAlert } from '../../actions/alert';
import { SHOW_ERROR, HIDE_ERROR, SHOW_ALERT, HIDE_ALERT } from '../../actions/actionTypes';

describe('authActions', () => {
  describe('showError()', () => {
    it('should return SHOW_ERROR action object', () => {
      // Arrange & Act
      const actionResult = showError('x');

      // Assert
      expect(actionResult).toEqual({
        type: SHOW_ERROR,
        message: 'x',
      });
    });
  });

  describe('hideError()', () => {
    it('should return HIDE_ERROR action object', () => {
      // Arrange & Act
      const actionResult = hideError();

      // Assert
      expect(actionResult).toEqual({ type: HIDE_ERROR });
    });
  });

  describe('showAlert()', () => {
    it('should return SHOW_ALERT action object', () => {
      // Arrange & Act
      const actionResult = showAlert('x');

      // Assert
      expect(actionResult).toEqual({
        type: SHOW_ALERT,
        message: 'x',
      });
    });
  });

  describe('hideAlert()', () => {
    it('should return HIDE_ERROR action object', () => {
      // Arrange & Act
      const actionResult = hideAlert();

      // Assert
      expect(actionResult).toEqual({ type: HIDE_ALERT });
    });
  });
});