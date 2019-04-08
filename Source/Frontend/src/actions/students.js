import { STUDENTS_BULK_ADD_DONE, STUDENTS_LOADING, STUDENTS_SUCCESS, ROOM_CONFIRMED } from './actionTypes';
import { showError } from './alert';
import makeActionCreator from './makeActionCreator';
import config from '../config.js';
import studentFilter from './studentFilter';

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
    const normalizedData = studentFilter(data);
    console.log(normalizedData);
    
    dispatch(studentsLoading(true));
    
    fetch(`${config.endpoint}/students/batch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getState().auth.accessToken}`,
      },
      body: JSON.stringify({
        students: normalizedData
      })
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

export const confirmRoom = () => {
  return (dispatch, getState) => {
    fetch(`${config.endpoint}/rooms/confirm`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getState().auth.accessToken}`,
      }
    })
      .then(() => {
        dispatch(roomConfirmed());
      })
      .catch((error)=> {
        dispatch(showError('The system could not confirm your room at this time.. Please, try again later.'));
        console.error(error);
      });
  };
};

export const studentsLoading = makeActionCreator(STUDENTS_LOADING, 'isLoading');
export const studentsSuccess = makeActionCreator(STUDENTS_SUCCESS, 'students');
export const studentsBulkAddDone = makeActionCreator(STUDENTS_BULK_ADD_DONE, 'isDone');
export const roomConfirmed = makeActionCreator(ROOM_CONFIRMED);
//export const createStudentDone = makeActionCreator(CREATE_STUDENT_DONE, 'student');