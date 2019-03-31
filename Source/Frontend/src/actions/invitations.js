import { FETCH_INVITATIONS_SUCCESS, INVITATIONS_LOADING } from './actionTypes';
import { showError } from './alert';
import makeActionCreator from './makeActionCreator';
import config from '../config.js';

export const fetchInvitations = () => {
  return (dispatch, getState) => {
    fetch(`${config.endpoint}/students/invitations`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getState().auth.accessToken}`,
      }
    })
      .then(res => res.json())
      .then(res => {
        dispatch(fetchInvitationsSuccess(res));
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

export const fetchInvitationsSuccess = makeActionCreator(FETCH_INVITATIONS_SUCCESS, 'invitations');
export const invitationsLoading = makeActionCreator(INVITATIONS_LOADING, 'isLoading');