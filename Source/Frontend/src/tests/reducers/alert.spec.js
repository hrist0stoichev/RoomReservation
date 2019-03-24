import reducer from '../../reducers/alert';
import { showAlert, hideAlert, showError, hideError } from '../../actions/alert';

const initialState = {
  error: false,
  errorMessage: '',
  alert: false,
  alertMessage: '',
};

describe('alertReducer', () => {
  it('should return initial state', () => {
    // Arrange & Act
    const state = reducer(undefined, {});

    // Assert
    expect(state).toEqual(initialState);
  });

  it('should handle SHOW_ERROR action', () => {
    // Arrange & Act
    const action = showError('x');
    const state = reducer(initialState, action);

    // Assert
    expect(state.error).toEqual(true);
    expect(state.errorMessage).toEqual('x');
  });

  it('should handle HIDE_ERROR action', () => {
    // Arrange & Act
    const action = hideError();
    const state = reducer(initialState, action);

    // Assert
    expect(state.error).toEqual(false);
    expect(state.errorMessage).toEqual('');
  });

  it('should handle SHOW_ALERT action', () => {
    // Arrange & Act
    const action = showAlert('x');
    const state = reducer(initialState, action);

    // Assert
    expect(state.alert).toEqual(true);
    expect(state.alertMessage).toEqual('x');
  });

  it('should handle HIDE_ALERT action', () => {
    // Arrange & Act
    const action = hideAlert();
    const state = reducer(initialState, action);

    // Assert
    expect(state.alert).toEqual(false);
    expect(state.alertMessage).toEqual('');
  });
});