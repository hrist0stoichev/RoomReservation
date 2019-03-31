import { FETCH_APARTMENTS_SUCCESS } from '../actions/actionTypes';

const initialState = {
  apartments: [],
};

const apartments = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_APARTMENTS_SUCCESS:
      return {
        ...state,
        apartments: action.apartments,
      };
    default:
      return state;
  }
};

export default apartments;