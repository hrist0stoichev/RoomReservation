import React from 'react';
import RoomsGrid from '../containers/RoomsGrid';
import MainLayout from '../components/MainLayout';

const RoomsView = (props) => {
  const url = window.location.href.split('=');
  const sk = parseInt(url[1]);
  const floor = parseInt(url[2]);

  return (
    <MainLayout
      title={`Rooms | Skaptopara ${sk} Floor ${floor}`}
      secondaryNav={[
        {
          title: 'All Rooms',
          href: '/rooms/'
        },
        {
          title: 'Create Room',
          href: '/rooms/create'
        }
      ]}>
        <RoomsGrid sk={sk} floor={floor} />
    </MainLayout>
  );
};

export default RoomsView;
