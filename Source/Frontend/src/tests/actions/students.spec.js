import { studentsLoading, studentsSuccess, studentsBulkAddDone } from '../../actions/students';
import { STUDENTS_LOADING, STUDENTS_SUCCESS, STUDENTS_BULK_ADD_DONE } from '../../actions/actionTypes';

describe('studentsActions', () => {
  describe('studentsLoading()', () => {
    it('should return STUDENTS_LOADING action object', () => {
      // Arrange & Act
      const actionResult = studentsLoading(true);

      // Assert
      expect(actionResult.type).toEqual(STUDENTS_LOADING);
      expect(actionResult.isLoading).toEqual(true);
    });
  });

  describe('studentsSuccess()', () => {
    it('should return STUDENTS_SUCCESS action object', () => {
      // Arrange & Act
      const actionResult = studentsSuccess(['x', 'y']);

      // Assert
      expect(actionResult.type).toEqual(STUDENTS_SUCCESS);
      expect(actionResult.students).toEqual(['x', 'y']);
    });
  });

  describe('studentsBulkAddDone()', () => {
    it('should return STUDENTS_BULK_ADD_DONE action object', () => {
      // Arrange & Act
      const actionResult = studentsBulkAddDone(true);

      // Assert
      expect(actionResult.type).toEqual(STUDENTS_BULK_ADD_DONE);
      expect(actionResult.isDone).toEqual(true);
    });
  });
});