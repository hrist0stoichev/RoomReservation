import reducer from '../../reducers/alert';
import { createCampaignLoading, createCampaignSuccess, getCampaignDone } from '../../actions/campaign';

const initialState = {
  isLoading: false,
  isDone: false,
  currentCampaign: null,
};

describe('campaignReducer', () => {
  it('should return initial state', () => {
    // Arrange & Act
    const state = reducer(undefined, {});

    // Assert
    expect(state).toEqual(initialState);
  });

  it('should handle CREATE_CAMPAIGN_LOADING action', () => {
    // Arrange & Act
    const action = createCampaignLoading(true);
    const state = reducer(initialState, action);

    // Assert
    expect(state.isLoading).toEqual(true);
  });

  it('should handle CREATE_CAMPAIGN_SUCCESS action', () => {
    // Arrange & Act
    const action = createCampaignSuccess();
    const state = reducer(initialState, action);

    // Assert
    expect(state.isDone).toEqual(true);
  });

  it('should handle GET_CAMPAIGN_DONE action', () => {
    // Arrange & Act
    const action = getCampaignDone(['1', '2', '3', '4', '5']);
    const state = reducer(initialState, action);

    // Assert
    expect(state.currentCampaign.phase0start).toEqual('1');
    expect(state.currentCampaign.phase1start).toEqual('2');
    expect(state.currentCampaign.phase2start).toEqual('3');
    expect(state.currentCampaign.phase3start).toEqual('4');
  });
});