import React from 'react';
import MainLayout from '../components/MainLayout';
import Buildings from '../components/Rooms/Buildings';

class Rooms extends React.Component {
  render() {
    return (
      <div id="rooms">
        <MainLayout
          title="Rooms"
          secondaryNav={[
            {
              title: 'Apartments',
              href: '/apartments'
            }
          ]}
        >
          <Buildings />
        </MainLayout>
      </div>
    );
  }
}

export default Rooms;
