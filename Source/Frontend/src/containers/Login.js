import { connect } from 'react-redux';
import Login from '../routes/Login';
import { login, logout } from '../actions/auth';
import { showError } from '../actions/alert';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  username: state.auth.username,
  accessToken: state.auth.accessToken,
  userRole: state.auth.userRole,
  phase: state.auth.phase,
  loc: state.auth.loc
});

const mapDispatchToProps = dispatch => ({
  login(user) {
    dispatch(login(user));
  },

  logout() {
    dispatch(logout());
  },

  showError(message) {
    dispatch(showError(message));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);