import { FETCH_INVITATIONS_SUCCESS, INVITATIONS_LOADING } from '../actions/actionTypes';

const initialState = {
  invitations: [],
  isLoading: false,
};

const invitations = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INVITATIONS_SUCCESS:
      return {
        ...state,
        rooms: action.invitations,
      };
    case INVITATIONS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
}

export default invitations;