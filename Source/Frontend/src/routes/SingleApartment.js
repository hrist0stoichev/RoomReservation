import React, { Component } from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row, Col, Input } from 'reactstrap';
import MainLayout from '../components/MainLayout';
import './SingleView.scss';

export class SingleApartment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apartment: {
        room1: '',
        room2: '',
      }
    };
  }

  componentWillMount() {
    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');
    //const apartment = this.props.apartments.find(apartment => apartment.Id === id);
    //this.setState({apartment});
  }

  render() {
    return (
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
        ]}>
        <div id="single-view">
          <Row>
            <Col>
              <ListGroup>
                <ListGroupItem>
                  <ListGroupItemHeading>Room #1</ListGroupItemHeading>
                  <ListGroupItemText>{this.state.apartment.room1}</ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Room #2</ListGroupItemHeading>
                  <ListGroupItemText>{this.state.apartment.room2}</ListGroupItemText>
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col>
              <ListGroup>
                <ListGroupItem>
                  <ListGroupItemHeading>Room #1 Residents</ListGroupItemHeading>
                  <ListGroupItemText>{}</ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Room #2 Residents</ListGroupItemHeading>
                  <ListGroupItemText>{}</ListGroupItemText>
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </div>
      </MainLayout>
    );
  };
};

export default SingleApartment;
