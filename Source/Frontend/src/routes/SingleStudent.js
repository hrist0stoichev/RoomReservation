import React, { Component } from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row, Col, Input } from 'reactstrap';
import MainLayout from '../components/MainLayout';
import './SingleView.scss';

export class SingleStudent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      student: {}
    }
  }

  componentWillMount() {
    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');
    const student = this.props.students.find(student => student.Id === id);
    this.setState({student});
  }

  render() {
    return (
      <MainLayout title="Students" secondaryNav={[]}>
        <div id="single-view">
        {console.log(this.state.student)}
          <Row>
            <Col>
              <ListGroup>
                <ListGroupItem>
                  <ListGroupItemHeading>ID</ListGroupItemHeading>
                  <ListGroupItemText>{this.state.student.Id}</ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Name</ListGroupItemHeading>
                  <ListGroupItemText>{`${this.state.student.FirstName} ${this.state.student.MiddleName} ${this.state.student.LastName}`}</ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Sex</ListGroupItemHeading>
                  <ListGroupItemText>{this.state.student.IsMale ? 'Male' : 'Female'}</ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Email</ListGroupItemHeading>
                  <ListGroupItemText>{this.state.student.Email}</ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Current Room Number</ListGroupItemHeading>
                  <ListGroupItemText>{this.state.student.CurrentRoomNumber}</ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Credit Hours</ListGroupItemHeading>
                  <ListGroupItemText>{this.state.student.CreditHours}</ListGroupItemText>
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col>
              <ListGroup>
                <ListGroupItem>
                  <ListGroupItemHeading>On Campus</ListGroupItemHeading>
                  <ListGroupItemText><Input type="checkbox" disabled={true} checked={this.state.student.IsOnCampus} /></ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Resident Assistant</ListGroupItemHeading>
                  <ListGroupItemText><Input type="checkbox" disabled={true} checked={this.state.student.IsRA} /></ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Room Confirmed</ListGroupItemHeading>
                  <ListGroupItemText><Input type="checkbox" disabled={true} checked={this.state.student.IsRoomConfirmed} /></ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Registration Time</ListGroupItemHeading>
                  <ListGroupItemText>{this.state.student.RegistrationTime}</ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Comments</ListGroupItemHeading>
                  <ListGroupItemText>{this.state.student.comments}</ListGroupItemText>
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </div>
      </MainLayout>
    );
  };
};

export default SingleStudent;
