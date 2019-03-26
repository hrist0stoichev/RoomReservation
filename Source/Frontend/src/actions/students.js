import { STUDENTS_BULK_ADD_DONE, STUDENTS_LOADING, STUDENTS_SUCCESS, CREATE_STUDENT_DONE } from './actionTypes';
import { showError } from './alert';
import makeActionCreator from './makeActionCreator';
import config from '../config.js';

export const fetchStudents = () => {
  return (dispatch, getState) => {
    dispatch(studentsLoading(true));

    fetch(`${config.endpoint}/students`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getState().auth.accessToken}`,
      }
    })
      .then(res => res.json())
      .then(res => {
        dispatch(studentsLoading(false));
        dispatch(studentsSuccess(res));
      })
      .catch(error => {
        dispatch(studentsLoading(false));
        dispatch(showError('Could not fetch students.'));
        console.log(error);
      });
  }
}

export const bulkAddStudents = (data) => {
  return (dispatch, getState) => {
    console.log(data);
    
    dispatch(studentsLoading(true));
    fetch(`${config.endpoint}/students/batch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getState().auth.accessToken}`,
      },
      body: JSON.stringify(data)
    })
      .then(() => {
        dispatch(studentsLoading(false));
        dispatch(studentsBulkAddDone(true));
      })
      .catch(error => {
        dispatch(studentsLoading(false));
        dispatch(showError('Could not process students.'));
        console.log(error);
      });
  };
};

/*
export const createStudent = (student) => {
  return (dispatch, getState) => {
    fetch(`${config.endpoint}/students/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getState().auth.accessToken}`,
      },
      body: JSON.stringify(student)
    })
      .then(() => {
        dispatch(createStudentDone(student));
      })
      .catch(error => {
        dispatch(showError('Could not create student.'));
      });
  };
};
*/

export const studentsLoading = makeActionCreator(STUDENTS_LOADING, 'isLoading');
export const studentsSuccess = makeActionCreator(STUDENTS_SUCCESS, 'students');
export const studentsBulkAddDone = makeActionCreator(STUDENTS_BULK_ADD_DONE, 'isDone');
//export const createStudentDone = makeActionCreator(CREATE_STUDENT_DONE, 'student');