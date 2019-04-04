import { connect } from 'react-redux';
import IsStudent from '../components/IsStudent';

const mapStateToProps = state => ({
  isStudent: state.auth.userRole !== 'Admin'
});

export default connect(mapStateToProps)(IsStudent);