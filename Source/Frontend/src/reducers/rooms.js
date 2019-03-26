import { FETCH_ROOMS_SUCCESS } from '../actions/actionTypes';

const initialState = {
  rooms: [],
};

const rooms = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ROOMS_SUCCESS:
      return {
        ...state,
        rooms: action.rooms,
      };
    default:
      return state;
  }
}

export default rooms;