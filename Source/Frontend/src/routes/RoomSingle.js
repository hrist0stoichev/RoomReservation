import React, { Component } from 'react';
import config from '../config';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Input, Row, Col } from 'reactstrap';
import MainLayout from '../components/MainLayout';
import './SingleView.scss';

export class RoomSingle extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  componentWillMount() {
    const url = window.location.href
    const roomNumber = url.split('?roomNumber=')[1];

    fetch(`${config.endpoint}/rooms/${roomNumber}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.accessToken}`
      },
    })
      .then(res => res.json())
      .then((res) => this.setState(res))
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
                  <ListGroupItemText>
                    <Input type="text" name="Number" onChange={this.handleInput} value={this.state.Number} />
                  </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Capacity</ListGroupItemHeading>
                  <ListGroupItemText>
                    <Input type="text" name="Capacity" onChange={this.handleInput} value={this.state.Capacity} />
                  </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Sex</ListGroupItemHeading>
                  <ListGroupItemText>
                    <Input type="select" name="IsMale" onChange={this.handleInput} value={this.state.IsMale}>
                      <option value={true}>Male</option>
                      <option value={false}>Female</option>
                    </Input>
                  </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Comments</ListGroupItemHeading>
                  <ListGroupItemText>
                    <Input type="text" name="Comments" onChange={this.handleInput} value={this.state.Comments} />
                  </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Apartment Room Number</ListGroupItemHeading>
                  <ListGroupItemText>{
                    this.state.ApartmentRoom && this.state.ApartmentRoom.Number ?
                    this.state.ApartmentRoom.Number
                    : 'N/A'}</ListGroupItemText>
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col>
              <ListGroup>
                <ListGroupItem>
                  <ListGroupItemHeading>RA Room</ListGroupItemHeading>
                  <ListGroupItemText>
                    <Input type="checkbox" name="IsRA" onChange={this.handleCheckbox} checked={this.state.IsRA} />
                  </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Reserved</ListGroupItemHeading>
                  <ListGroupItemText>
                    <Input type="checkbox" name="IsReserved" onChange={this.handleCheckbox} checked={this.state.IsReserved} />
                  </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Residents</ListGroupItemHeading>
                  <ListGroupItemText>
                    <ListGroup>
                      {this.state.Residents && this.state.Residents.length > 0 ?
                        this.state.Residents.map(resident => <ListGroupItem><span style={{ fontWeight: 'bold' }}>{ resident.Id }</span> {`${resident.FirstName} ${resident.LastName}`}</ListGroupItem>)
                      : <ListGroupItem>N/A</ListGroupItem>}
                    </ListGroup>
                  </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Invitations</ListGroupItemHeading>
                  <ListGroupItemText>
                    <ListGroup>
                      {this.state.Invitations && this.state.Invitations.length > 0 ?
                        this.state.Invitations.map(invitation => <ListGroupItem>From (ID): {invitation.FromStudentId} To (ID): {invitation.ToStudentId}</ListGroupItem>)
                      : <ListGroupItem>N/A</ListGroupItem>}
                    </ListGroup>
                  </ListGroupItemText>
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
