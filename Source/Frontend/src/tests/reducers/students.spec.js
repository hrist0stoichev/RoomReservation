import reducer from '../../reducers/students';
import { studentsLoading, studentsSuccess, studentsBulkAddDone } from '../../actions/students';

const initialState = {
  students: [],
  isLoading: false,
  bulkAddIsDone: false,
};

describe('studentsReducer', () => {
  it('should return initial state', () => {
    // Arrange & Act
    const state = reducer(undefined, {});

    // Assert
    expect(state).toEqual(initialState);
  });

  it('should handle STUDENTS_LOADING action', () => {
    // Arrange & Act
    const action = studentsLoading(true);
    const state = reducer(initialState, action);

    // Assert
    expect(state.isLoading).toEqual(true);
  });

  it('should handle STUDENTS_SUCCESS action', () => {
    // Arrange & Act
    const action = studentsSuccess(['x', 'y']);
    const state = reducer(initialState, action);

    // Assert
    expect(state.students).toEqual(['x', 'y']);
  });

  it('should handle STUDENTS_BULK_ADD_DONE action', () => {
    // Arrange & Act
    const action = studentsBulkAddDone(true);
    const state = reducer(initialState, action);

    // Assert
    expect(state.bulkAddIsDone).toEqual(true);
  });
});