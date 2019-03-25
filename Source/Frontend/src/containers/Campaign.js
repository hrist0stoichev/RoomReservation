import { connect } from 'react-redux';
import Campaign from '../routes/Campaign';
import { getCampaign, createCampaign } from '../actions/campaign';

const mapStateToProps = state => ({
  campaign: state.campaign.currentCampaign,
  isLoading: state.campaign.isLoading,
  isDone: state.campaign.isDone,
});

const mapDispatchToProps = dispatch => ({
  getCampaign() {
    dispatch(getCampaign());
  },

  createCampaign(dates) {
    dispatch(createCampaign(dates));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Campaign);
