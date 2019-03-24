import { CREATE_CAMPAIGN_LOADING, CREATE_CAMPAIGN_SUCCESS } from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  isDone: false,
  currentCampaign: null,
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
    case GET_CAMPAIGN_DONE:
      return {
        ...state,
        currentCampaign: action.campaign
      }
    default:
      return initialState;
  }
};

export default campaign;