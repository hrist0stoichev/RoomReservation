import { connect } from 'react-redux';
import Invitations from '../components/Invitations';
import { fetchInvitations } from '../actions/invitations';

const mapStateToProps = state => ({
  invitations: state.invitations.invitations,
  isLoading: state.invitations.isLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchInvitations() {
    dispatch(fetchInvitations());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Invitations);
