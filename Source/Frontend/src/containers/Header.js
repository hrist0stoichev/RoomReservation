import { connect } from 'react-redux';
import Header from '../components/Header';
import { logout } from '../actions/auth';
import { confirmRoom } from '../actions/students';

const mapStateToProps = (state) => ({
  username: state.auth.username,
  isAuthenticated: state.auth.isAuthenticated,
  roomConfirmed: state.students.roomConfirmed,
});

const mapDispatchToProps = dispatch => ({
  logout() {
    dispatch(logout());
  },

  confirmRoom() {
    dispatch(confirmRoom());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
