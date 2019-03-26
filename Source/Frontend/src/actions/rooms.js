import { FETCH_ROOMS_SUCCESS } from './actionTypes';
import makeActionCreator from './makeActionCreator';
import { showError } from '../actions/alert';
import config from '../config';

export const fetchRooms = (sk, floor) => {
  return (dispatch, getState) => {
    fetch(`${config.endpoint}/rooms?skaptoNumber=${sk}&floor=${floor}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getState().auth.accessToken}`,
      },
    })
      .then(res => res.json())
      .then((res) => {
        dispatch(fetchRoomsSuccess(res));
      })
      .catch((error) => {
        dispatch(showError('Could not fetch rooms.'));
      });
  };
};

export const fetchRoomsSuccess = makeActionCreator(FETCH_ROOMS_SUCCESS, 'rooms');