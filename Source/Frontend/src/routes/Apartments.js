import React from 'react';
import MainLayout from '../components/MainLayout';
import ApartmentsGrid from '../components/Apartments/ApartmentsGrid';

class Apartments extends React.Component {
  componentWillMount() {
    this.props.fetchApartments();
  }

  render() {
    return (
      <div id="apartments">
        <MainLayout
          title="Apartments"
          secondaryNav={[
            {
              title: 'All Apartments',
              href: '/apartments/'
            },
            {
              title: 'Create Apartment',
              href: '/apartments/create'
            }
          ]}
        >
          <ApartmentsGrid apartments={this.props.apartments} />
        </MainLayout>
      </div>
    );
  }
}

export default Apartments;
