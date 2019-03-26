import { connect } from 'react-redux';
import RoomSingle from '../routes/RoomSingle';

const mapStateToProps = state => ({
  accessToken: state.auth.accessToken
});

export default connect(mapStateToProps)(RoomSingle);
