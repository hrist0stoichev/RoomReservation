import { connect } from 'react-redux';
import SingleStudent from '../routes/SingleStudent';
import { showError } from '../actions/alert';

const mapStateToProps = state => ({
  accessToken: state.auth.accessToken
});

const mapDispatchToProps = dispatch => ({
  showError(error) {
    dispatch(showError(error));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleStudent);
