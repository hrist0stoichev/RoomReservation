import { STUDENTS_LOADING, STUDENTS_SUCCESS, STUDENTS_BULK_ADD_DONE, CREATE_STUDENT_DONE } from '../actions/actionTypes';

const initialState = {
  students: [],
  isLoading: false,
  bulkAddIsDone: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case STUDENTS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case STUDENTS_SUCCESS:
      return {
        ...state,
        students: action.students,
      };
    case STUDENTS_BULK_ADD_DONE:
      return {
        ...state,
        bulkAddIsDone: action.isDone,
      }
    case CREATE_STUDENT_DONE:
      const students = state.students.slice();
      students.push(action.student);
      return {
        ...state,
        students,
      }
    default:
      return state;
  }
};

export default auth;