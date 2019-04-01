import { FETCH_INVITATIONS_STUDENT_SUCCESS, FETCH_INVITATIONS_ADMIN_SUCCESS, INVITATIONS_LOADING } from '../actions/actionTypes';

const initialState = {
  invitations: [],
  fromInvitations: [],
  toInvitations: [],
  isLoading: false,
};

const invitations = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INVITATIONS_ADMIN_SUCCESS:
      return {
        ...state,
        invitations: action.invitations,
      };
    case FETCH_INVITATIONS_STUDENT_SUCCESS:
      return {
        ...state,
        fromInvitations: action.fromInvitations,
        toInvitations: action.toInvitations
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