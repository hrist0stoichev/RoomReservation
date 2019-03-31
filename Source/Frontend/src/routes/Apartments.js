import React from 'react';
import MainLayout from '../components/MainLayout';

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
          Apartments
        </MainLayout>
      </div>
    );
  }
}

export default Rooms;
