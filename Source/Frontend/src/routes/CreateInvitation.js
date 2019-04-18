import React from 'react';
import MainLayout from '../components/MainLayout';
import { Row, Col, Card, CardBody, Input, Button, Label, FormGroup } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import config from '../config';

class CreateInvitation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      studentId: '',
      roomNumber: '',
      apartmentRoomNumber: '',
      chosenRoom: '',
      done: false,
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleInput(e) {
    this.setState({ studentId: e.target.value });
  }

  handleSubmit() {
    this.props.createInvitation(this.state.studentId, this.state.chosenRoom);
    this.setState({ done: true });
  }
  
  handleSelect(e) {
    this.setState({ chosenRoom: e.target.value });
  }

  done() {
    if (this.state.done) {
      return <Redirect to='/rooms' />
    } else {
      return '';
    }
  }

  componentWillMount() {
    if (this.props.auth.currentRoomNumber) {
      fetch(`${config.endpoint}/rooms/${this.props.auth.currentRoomNumber}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.props.auth.accessToken}`,
        }
      })
        .then(res => res.json())
        .then(res => this.setState({ 
          roomNumber: res.Number,
          chosenRoom: res.Number,
          apartmentRoomNumber: res.ApartmentRoomNumber || null
        }))
        .catch(error => console.log(error));
    }
  }

  render() {
    return (
      <MainLayout title="Invite New Roommate" secondaryNav={[]}>
          <Row>
            <Col md="6">
              {this.done()}
              <Card>
                <CardBody>
                  <FormGroup>
                    <Label for="student-id">Room</Label>
                    { this.state.ApartmentRoomNumber === null ?
                        <Input type="text" disabled value={this.state.currentRoomNumber} />
                      :
                        <Input type="select" value={this.state.chosenRoom} onChange={this.handleSelect}>
                          <option value={this.state.roomNumber}>{this.state.roomNumber}</option>
                          <option value={this.state.ApartmentRoomNumber}>{this.state.ApartmentRoomNumber}</option>
                        </Input>
                    }
                  </FormGroup>
                  <FormGroup>
                    <Label for="student-id">Student ID</Label>
                    <Input type="text" name="student-id" id="student-id" value={this.state.studentId} onChange={this.handleInput} />
                  </FormGroup>
                  <Button color="primary" onClick={this.handleSubmit}>Invite</Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
      </MainLayout>
    );
  }
}

export default CreateInvitation;