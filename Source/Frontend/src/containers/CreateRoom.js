import { connect } from 'react-redux';
import CreateRoom from '../routes/CreateRoom';
import { showError } from '../actions/alert';

const mapStateToProps = state => ({
  accessToken: state.auth.accessToken
});

const mapDispatchToProps = dispatch => ({
  showError(error) {
    dispatch(showError(error));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoom);
