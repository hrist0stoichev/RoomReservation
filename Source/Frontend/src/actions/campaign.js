import { CREATE_CAMPAIGN_LOADING, CREATE_CAMPAIGN_SUCCESS, GET_CAMPAIGN_DONE } from './actionTypes';
import { showError } from './alert';
import makeActionCreator from './makeActionCreator';
import config from '../config.js';

export const getCampaign = () => {
  return (dispatch) => {
    dispatch(loginLoading(true));

    fetch(`${config.endpoint}/campaigns/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getState().auth.accessToken}`,
      },
      method: "POST"
    })
      .then(res => res.json())
      .then(res => {
        dispatch(loginLoading(false));
        dispatch(loginSuccess(res));
      })
      .catch(error => {
        dispatch(loginLoading(false));
        dispatch(showError(error.toString()));
      });
  }
};

export const createCampaignLoading = makeActionCreator(CREATE_CAMPAIGN_LOADING, 'isLoading');
export const createCampaignSuccess = makeActionCreator(CREATE_CAMPAIGN_SUCCESS);
export const getCampaignDone = makeActionCreator(GET_CAMPAIGN_DONE, 'campaign');
