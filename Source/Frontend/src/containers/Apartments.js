import { connect } from 'react-redux';
import Apartments from '../routes/Apartments';
import { fetchApartments } from '../actions/apartments';
import { showError } from '../actions/alert';

const mapStateToProps = state => ({
  accessToken: state.auth.accessToken,
  apartments: state.apartments.apartments
});

const mapDispatchToProps = dispatch => ({
  fetchApartments() {
    return dispatch(fetchApartments());
  },

  showError(error) {
    dispatch(showError(error));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Apartments);
