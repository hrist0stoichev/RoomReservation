import { CREATE_CAMPAIGN_LOADING, CREATE_CAMPAIGN_SUCCESS, GET_CAMPAIGN_DONE } from '../actions/actionTypes';

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
        currentCampaign: {
          phase0start: action.campaign[0],
          phase0end: action.campaign[1],
          phase1start: action.campaign[1],
          phase1end: action.campaign[2],
          phase2start: action.campaign[2],
          phase2end: action.campaign[3],
          phase3start: action.campaign[3],
          phase3end: action.campaign[4]
        }
      }
    default:
      return initialState;
  }
};

export default campaign;