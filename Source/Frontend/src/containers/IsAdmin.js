import { connect } from 'react-redux';
import IsAdmin from '../components/IsAdmin';

const mapStateToProps = state => ({
  isAdmin: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(IsAdmin);