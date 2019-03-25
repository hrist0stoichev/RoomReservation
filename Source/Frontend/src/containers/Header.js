import { connect } from 'react-redux';
import Header from '../components/Header';
import { logout } from '../actions/auth';

const mapStateToProps = (state) => ({
  username: state.auth.username,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  logout() {
    dispatch(logout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
