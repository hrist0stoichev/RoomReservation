import { connect } from 'react-redux';
import Campaign from '../routes/Campaign';
import { getCampaign, createCampaign } from '../actions/campaign';
import { showError } from '../actions/alert';

const mapStateToProps = state => ({
  campaign: state.campaign.currentCampaign,
  isLoading: state.campaign.isLoading,
  isDone: state.campaign.isDone,
  phase: state.auth.phase,
  accessToken: state.auth.accessToken,
});

const mapDispatchToProps = dispatch => ({
  getCampaign() {
    dispatch(getCampaign());
  },

  createCampaign(dates) {
    dispatch(createCampaign(dates));
  },

  showError(error) {
    dispatch(showError(error));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Campaign);
