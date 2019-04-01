import { connect } from 'react-redux';
import SingleApartment from '../routes/SingleApartment';

const mapStateToProps = state => ({
  apartments: state.apartments.apartments
});

export default connect(mapStateToProps)(SingleApartment);
