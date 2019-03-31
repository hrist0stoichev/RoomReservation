import { connect } from 'react-redux';
import InvitationsAdmin from '../routes/InvitationsAdmin';
import { fetchInvitations } from '../actions/invitations';
import { showError } from '../actions/alert';

const mapStateToProps = state => ({
  accessToken: state.auth.accessToken,
  invitations: state.invitations.invitations
});

const mapDispatchToProps = dispatch => ({
  fetchInvitations() {
    return dispatch(fetchInvitations());
  },

  showError(error) {
    return dispatch(showError(error));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(InvitationsAdmin);
