import { connect } from 'react-redux';
import Rooms from '../routes/Rooms';

const mapStateToProps = state => ({
  accessToken: state.auth.accessToken
});

export default connect(mapStateToProps)(Rooms);