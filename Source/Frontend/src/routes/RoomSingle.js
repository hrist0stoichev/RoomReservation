import React, { Component } from 'react';
import config from '../config';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Input, Row, Col } from 'reactstrap';
import MainLayout from '../components/MainLayout';
import './SingleView.scss';

export class RoomSingle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      room: {}
    }
  }

  componentWillMount() {
    const url = new URL(window.location.href);
    const roomNumber = url.searchParams.get('roomNumber');

    fetch(`${config.endpoint}/rooms/${roomNumber}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.accessToken}`
      },
    })
      .then(res => res.json())
      .then((res) => this.setState({ room: res }))
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <MainLayout title="Rooms" secondaryNav={[]}>
        <div id="single-view">
          <Row>
            <Col>
              <ListGroup>
                <ListGroupItem>
                  <ListGroupItemHeading>Number</ListGroupItemHeading>
                  <ListGroupItemText>{this.state.room.Number}</ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Capacity</ListGroupItemHeading>
                  <ListGroupItemText>{this.state.room.capacity}</ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Sex</ListGroupItemHeading>
                  <ListGroupItemText>{this.state.room.IsMale ? 'Male' : 'Female'}</ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Comments</ListGroupItemHeading>
                  <ListGroupItemText>{this.state.room.Comments}</ListGroupItemText>
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col>
              <ListGroup>
                <ListGroupItem>
                  <ListGroupItemHeading>RA Room</ListGroupItemHeading>
                  <ListGroupItemText><Input type="checkbox" disabled={true} checked={this.state.room.IsRA} /></ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Reserved</ListGroupItemHeading>
                  <ListGroupItemText><Input type="checkbox" disabled={true} checked={this.state.room.IsReserved} /></ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Capacity</ListGroupItemHeading>
                  <ListGroupItemText>{this.state.room.Capacity}</ListGroupItemText>
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </div>
      </MainLayout>
    );
  }
}

export default RoomSingle;
