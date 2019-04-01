import { FETCH_APARTMENTS_SUCCESS } from './actionTypes';
import makeActionCreator from './makeActionCreator';
import { showError } from '../actions/alert';
import config from '../config';

export const fetchApartments = () => {
  return (dispatch, getState) => {
    fetch(`${config.endpoint}/rooms/apartments`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getState().auth.accessToken}`,
      },
    })
      .then(res => res.json())
      .then((res) => {
        dispatch(fetchApartmentsSuccess(res));
      })
      .catch((error) => {
        dispatch(showError('Could not fetch apartments. Try again later.'));
        console.log(error);
      });
  };
};

export const fetchApartmentsSuccess = makeActionCreator(FETCH_APARTMENTS_SUCCESS, 'apartments');