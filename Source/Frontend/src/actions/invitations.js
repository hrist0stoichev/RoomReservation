import { FETCH_INVITATIONS_STUDENT_SUCCESS, FETCH_INVITATIONS_ADMIN_SUCCESS, INVITATIONS_LOADING } from './actionTypes';
import { showError } from './alert';
import makeActionCreator from './makeActionCreator';
import config from '../config.js';

export const fetchInvitations = () => {
  return (dispatch, getState) => {
    fetch(`${config.endpoint}/invitations`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getState().auth.accessToken}`,
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.from || res.to) {
          dispatch(fetchInvitationsStudentSuccess(res));
        } else {
          dispatch(fetchInvitationsAdminSuccess(res));
        }
      })
      .catch(error => {
        dispatch(showError('Could not fetch invitations. Try again later.'));
        console.error(error);
      });
  }
};

export const createInvitation = (studentId) => {
  return (dispatch, getState) => {
    fetch(`${config.endpoint}/students/invitations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getState().auth.accessToken}`,
      },
      body: JSON.stringify({
        studentId
      })
    })
      .catch(error => {
        dispatch(showError('Could not create invitation. Try again later.'));
        console.error(error);
      });
  }
};

export const createInvitationAdmin = (invitation) => {
  return (dispatch, getState) => {
    fetch(`${config.endpoint}/invitations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getState().auth.accessToken}`,
      },
      body: JSON.stringify(invitation)
    })
      .catch(error => {
        dispatch(showError('Could not create invitation. Try again later.'));
        console.error(error);
      });
  }
};

export const fetchInvitationsStudentSuccess = makeActionCreator(FETCH_INVITATIONS_STUDENT_SUCCESS, 'fromInvitations', 'toInvitations');
export const fetchInvitationsAdminSuccess = makeActionCreator(FETCH_INVITATIONS_ADMIN_SUCCESS, 'invitations');
export const invitationsLoading = makeActionCreator(INVITATIONS_LOADING, 'isLoading');