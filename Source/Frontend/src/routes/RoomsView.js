import React from 'react';
import RoomsGrid from '../containers/RoomsGrid';
import MainLayout from '../components/MainLayout';

const RoomsView = (props) => {
  const url = new URL(window.location.href);
  const sk = url.searchParams.get('sk');
  const floor = url.searchParams.get('floor');

  return (
    <MainLayout title="Rooms" secondaryNav={[]}>
        <RoomsGrid sk={sk} floor={floor} />
    </MainLayout>
  );
};

export default RoomsView;
