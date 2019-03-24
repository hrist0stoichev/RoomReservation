import { CREATE_CAMPAIGN_LOADING, CREATE_CAMPAIGN_SUCCESS } from './actionTypes';
import { showError } from './alert';
import makeActionCreator from './makeActionCreator';
import config from '../config.js';

export const createCampaignLoading = makeActionCreator(CREATE_CAMPAIGN_LOADING, 'isLoading');
export const createCampaignSuccess = makeActionCreator(CREATE_CAMPAIGN_SUCCESS);
