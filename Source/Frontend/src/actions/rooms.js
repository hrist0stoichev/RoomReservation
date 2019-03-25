import { ROOMS_LOADING, FETCH_ROOMS_SUCCESS } from './actionTypes';
import makeActionCreator from './makeActionCreator';

export const fetchRooms = () => {
  return (dispatch) => {
    dispatch(fetchRoomsSuccess([
      {
        Number: '1234',
        Capacity: 4,
        IsMale: true,
        IsReserved: true,
        Comments: 'Lorem ipsum',
        ApartmentRoomNumber: 1235,
      }
    ]));
  };
};

export const roomsLoading = makeActionCreator(ROOMS_LOADING, 'isLoading');
export const fetchRoomsSuccess = makeActionCreator(FETCH_ROOMS_SUCCESS, 'rooms');