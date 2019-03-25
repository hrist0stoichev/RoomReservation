import { createCampaignLoading, createCampaignSuccess, getCampaignDone } from '../../actions/campaign';
import { CREATE_CAMPAIGN_LOADING, CREATE_CAMPAIGN_SUCCESS, GET_CAMPAIGN_DONE } from '../../actions/actionTypes';

describe('campaignActions', () => {
  describe('createCampaignLoading()', () => {
    it('should return CREATE_CAMPAIGN_LOADING action object', () => {
      // Arrange & Act
      const actionResult = createCampaignLoading(true);

      // Assert
      expect(actionResult).toEqual({
        type: CREATE_CAMPAIGN_LOADING,
        isLoading: true,
      });
    });
  });

  describe('createCampaignSuccess()', () => {
    it('should return CREATE_CAMPAIGN_SUCCESS action object', () => {
      // Arrange & Act
      const actionResult = createCampaignSuccess();

      // Assert
      expect(actionResult.type).toEqual(CREATE_CAMPAIGN_SUCCESS);
    });
  });

  describe('getCampaignDone()', () => {
    it('should return GET_CAMPAIGN_DONE action object', () => {
      // Arrange & Act
      const actionResult = getCampaignDone('x');

      // Assert
      expect(actionResult).toEqual({
        type: GET_CAMPAIGN_DONE,
        campaign: 'x',
      });
    });
  });
});