import { connect } from 'react-redux';
import CreateApartment from '../routes/CreateApartment';
import { showError } from '../actions/alert';

const mapStateToProps = state => ({
  accessToken: state.auth.accessToken
});

const mapDispatchToProps = dispatch => ({
  showError(error) {
    dispatch(showError(error));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateApartment);
