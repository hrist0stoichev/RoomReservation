import { CREATE_CAMPAIGN_LOADING, CREATE_CAMPAIGN_SUCCESS, GET_CAMPAIGN_DONE } from './actionTypes';
import { showError } from './alert';
import makeActionCreator from './makeActionCreator';
import config from '../config.js';

export const getCampaign = () => {
  return (dispatch, getState) => {
    fetch(`${config.endpoint}/campaigns/dates`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getState().auth.accessToken}`,
      }
    })
      .then(res => res.json())
      .then(res => {
        dispatch(getCampaignDone(res));
      })
      .catch(error => {
        dispatch(showError(error.toString()));
      });
  }
};


export const createCampaign = (dates) => {
  return (dispatch, getState) => {
    console.log('req body,', dates);
    dispatch(createCampaignLoading(true));
    fetch(`${config.endpoint}/campaigns`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getState().auth.accessToken}`,
      },
      body: JSON.stringify(dates),
    })
      .then(res => res.json())
      .then(res => {
        if (res.status === 400) {
          dispatch(createCampaignLoading(false));
          dispatch(showError('Could not create campaign. Check the dates and try again.'));
        } else {
          dispatch(createCampaignLoading(false));
          dispatch(createCampaignSuccess());
        }
        dispatch(getCampaign());
      })
      .catch(error => {
        dispatch(createCampaignLoading(false));
        dispatch(showError(error.toString()));
        dispatch(getCampaign());
      });
  };
};

export const createCampaignLoading = makeActionCreator(CREATE_CAMPAIGN_LOADING, 'isLoading');
export const createCampaignSuccess = makeActionCreator(CREATE_CAMPAIGN_SUCCESS);
export const getCampaignDone = makeActionCreator(GET_CAMPAIGN_DONE, 'campaign');
