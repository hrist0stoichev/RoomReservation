import { CREATE_CAMPAIGN_LOADING, CREATE_CAMPAIGN_SUCCESS } from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  isDone: false,
};

const campaign = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CAMPAIGN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_CAMPAIGN_SUCCESS:
      return {
        ...state,
        isDone: true,
      }
    default:
      return initialState;
  }
};

export default campaign;