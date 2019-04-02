import React, { Component } from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row, Col, Input } from 'reactstrap';
import MainLayout from '../components/MainLayout';
import './SingleView.scss';

export class SingleApartment extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    const url = window.location.href;
    const number = url.split('?number=')[1];
    const apartment = this.props.apartments.find(apartment => apartment.Number === number);
    if (apartment.IsMale === null) {
      apartment.Sex = '';
    } else {
      apartment.Sex = apartment.IsMale ? 'Male' : 'Female';
    }
    this.setState(apartment);
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
                  <ListGroupItemText>{this.state.Number}</ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Room #2</ListGroupItemHeading>
                  <ListGroupItemText>{this.state.ApartmentRoomNumber}</ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Sex</ListGroupItemHeading>
                  <ListGroupItemText>{this.state.Sex}</ListGroupItemText>
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col>
              <ListGroup>
                <ListGroupItem>
                  <ListGroupItemHeading>Capacity</ListGroupItemHeading>
                  <ListGroupItemText>{this.state.TotalCapacity}</ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Residents Count</ListGroupItemHeading>
                  <ListGroupItemText>{this.state.TotalResidentsCount}</ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Residents</ListGroupItemHeading>
                  <ListGroupItemText>
                    <ListGroup>
                      {
                        this.state.Residents1 && this.state.Residents1.length > 0 ?
                          this.state.Residents1.map(res => <ListGroupItem>ID: {res.Item1} &nbsp;&nbsp;&nbsp; Name: {res.Item2}</ListGroupItem>)
                        : ''
                      }
                      {
                        this.state.Residents2 && this.state.Residents2.length > 0 ?
                          this.state.Residents2.map(res => <ListGroupItem>ID: {res.Item1} &nbsp;&nbsp;&nbsp; Name: {res.Item2}</ListGroupItem>)
                        : ''
                      }
                      {
                        !this.state.Residents1 && !this.state.Residents2 ? <ListGroupItem>N/A</ListGroupItem> : ''
                      }
                    </ListGroup>
                  </ListGroupItemText>
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
