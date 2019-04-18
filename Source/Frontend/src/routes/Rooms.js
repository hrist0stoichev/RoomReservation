import React from 'react';
import MainLayout from '../components/MainLayout';
import Buildings from '../components/Rooms/Buildings';
import IsAdmin from '../containers/IsAdmin';
import IsStudent from '../containers/IsStudent';
import IsPhase from '../containers/IsPhase';

class Rooms extends React.Component {
  render() {
    return (
      <div id="rooms">
        <IsAdmin>
          <MainLayout
            title="Rooms"
            secondaryNav={[
              {
                title: 'All Rooms',
                href: '/rooms/'
              },
              {
                title: 'Create Room',
                href: '/rooms/create'
              }
            ]}
          >
            <Buildings />
          </MainLayout>
        </IsAdmin>
        <IsStudent>
          <MainLayout
            title="Rooms"
            secondaryNav={[]}
          >
            <IsPhase phase={3} elseMessage="Currently you cannot select a new room. You can browse rooms and select new place only in Phase 3">
              <Buildings />
            </IsPhase>
          </MainLayout>
        </IsStudent>
      </div>
    );
  }
}

export default Rooms;
