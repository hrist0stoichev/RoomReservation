import { connect } from 'react-redux';
import RoomsGrid from '../components/Rooms/RoomsGrid';
import { fetchRooms } from '../actions/rooms';
import { showError } from '../actions/alert';

const mapStateToProps = (state, ownProps) => ({
  accessToken: state.auth.accessToken,
  rooms: state.rooms.rooms,
  sk: ownProps.sk,
  floor: ownProps.floor,
});

const mapDispatchToProps = dispatch => ({
  fetchRooms(sk, floor) {
    dispatch(fetchRooms(sk, floor));
  },

  showError(error) {
    dispatch(showError(error));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomsGrid);