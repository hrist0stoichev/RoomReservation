import { connect } from 'react-redux';
import Rooms from '../routes/Rooms';
import { fetchRooms } from '../actions/rooms';

const mapStateToProps = state => ({
  rooms: state.rooms.rooms,
  isLoading: state.rooms.isLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchRooms() {
    dispatch(fetchRooms());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);