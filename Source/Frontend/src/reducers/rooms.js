import { ROOMS_LOADING, FETCH_ROOMS_SUCCESS } from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  rooms: [],
};

const rooms = (state = initialState, action) => {
  switch (action.type) {
    case ROOMS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
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