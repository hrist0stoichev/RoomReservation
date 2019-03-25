import React from 'react';
import MainLayout from '../components/MainLayout';
import RoomsGrid from '../components/Rooms/RoomsGrid';

class Rooms extends React.Component {
  componentWillMount() {
    this.props.fetchRooms();
  }

  render() {
    return (
      <div id="rooms">
        <MainLayout
          title="Rooms"
          secondaryNav={[]}
        >
          <RoomsGrid rooms={this.props.rooms} isLoading={this.props.isLoading} />
        </MainLayout>
      </div>
    );
  }
}

export default Rooms;
