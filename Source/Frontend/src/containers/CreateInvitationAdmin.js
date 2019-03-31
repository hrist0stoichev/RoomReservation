import { connect } from 'react-redux';
import CreateInvitationAdmin from '../routes/CreateInvitationAdmin';
import { showError } from '../actions/alert';

const mapStateToProps = state => ({
  accessToken: state.auth.accessToken
});

const mapDispatchToProps = dispatch => ({
  showError(error) {
    dispatch(showError(error));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateInvitationAdmin);
