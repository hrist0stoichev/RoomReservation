import { connect } from 'react-redux';
import CreateInvitation from '../routes/CreateInvitation';
import { createInvitation } from '../actions/invitations';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  createInvitation() {
    dispatch(createInvitation());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateInvitation);
