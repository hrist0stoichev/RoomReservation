import { connect } from 'react-redux';
import Alerts from '../components/Alerts';
import { hideError, hideAlert } from '../actions/alert';

const mapStateToProps = state => ({
  error: state.alert.error,
  alert: state.alert.alert,
  alertMessage: state.alert.alertMessage,
  errorMessage: state.alert.errorMessage,
});

const mapDispatchToProps = dispatch => ({
  hideError() {
    dispatch(hideError());
  },

  hideAlert() {
    dispatch(hideAlert());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);
