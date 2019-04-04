import { connect } from 'react-redux';
import IsAdmin from '../components/IsAdmin';

const mapStateToProps = state => ({
  isAdmin: state.auth.userRole == 'Admin'
});

export default connect(mapStateToProps)(IsAdmin);