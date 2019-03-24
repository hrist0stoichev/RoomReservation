import React from 'react';
import MainLayout from '../components/MainLayout';

const Main = () => (
  <div id="main">
    <MainLayout
      title="Main"
      secondaryNav={[
        {
          title: 'One',
          route: '/one',
        },
        {
          title: 'Two',
          route: '/two',
        }
      ]}
    >
      Main content
    </MainLayout>
  </div>
);

export default Main;
