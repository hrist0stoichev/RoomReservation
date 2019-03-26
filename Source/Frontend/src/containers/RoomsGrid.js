import { connect } from 'react-redux';
import RoomsGrid from '../components/Rooms/RoomsGrid';
import { fetchRooms } from '../actions/rooms';

const mapStateToProps = (state, ownProps) => ({
  rooms: state.rooms.rooms,
  sk: ownProps.sk,
  floor: ownProps.floor,
});

const mapDispatchToProps = dispatch => ({
  fetchRooms(sk, floor) {
    dispatch(fetchRooms(sk, floor));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomsGrid);