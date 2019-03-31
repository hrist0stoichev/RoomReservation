import { connect } from 'react-redux';
import Apartments from '../routes/Apartments';
import { fetchApartments } from '../actions/apartments';

const mapStateToProps = state => ({
  apartments: state.apartments.apartments
});

const mapDispatchToProps = dispatch => ({
  fetchApartments() {
    return dispatch(fetchApartments());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Apartments);
