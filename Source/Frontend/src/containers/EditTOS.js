import { connect } from 'react-redux';
import EditTOS from '../routes/EditTOS';
import { showError } from '../actions/alert';

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  showError(error) {
    dispatch(showError(error));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTOS);
