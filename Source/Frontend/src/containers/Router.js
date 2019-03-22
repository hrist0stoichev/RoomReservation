import { connect } from 'react-redux';
import Router from '../components/Router';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.role === 'admin' || false,
  phase: state.auth.phase
});

export default connect(mapStateToProps)(Router);