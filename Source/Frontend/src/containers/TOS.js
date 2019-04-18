import { connect } from 'react-redux';
import TOS from '../components/TOS';

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps)(TOS);
