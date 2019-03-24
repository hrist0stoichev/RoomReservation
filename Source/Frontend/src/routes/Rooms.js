import React from 'react';
import MainLayout from '../components/MainLayout';
import RoomsGrid from '../components/Rooms/RoomsGrid';

const Rooms = (props) => (
  <div id="rooms">
    <MainLayout
      title="Rooms"
      secondaryNav={[]}
    >
      <RoomsGrid accessToken={props.accessToken} />
    </MainLayout>
  </div>
);

export default Rooms;
