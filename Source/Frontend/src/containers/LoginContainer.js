import { connect } from 'react-redux';
import Login from '../routes/Login';
import { login, logout } from '../actions/authActions';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  isFailed: state.auth.isFailed,
  username: state.auth.username,
  error: state.auth.error,
  accessToken: state.auth.accessToken,
  userRole: state.auth.userRole,
  phase: state.auth.phase
});

const mapDispatchToProps = dispatch => ({
  login(user) {
    dispatch(login(user));
  },

  logout() {
    dispatch(logout());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);