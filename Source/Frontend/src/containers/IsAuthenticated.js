import { connect } from 'react-redux';
import IsAuthenticated from '../components/IsAuthenticated';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(IsAuthenticated);