import React from 'react';
import MainLayout from '../components/MainLayout';
import { Redirect } from 'react-router-dom';
import config from '../config';
import { FormGroup, Label, Input, Card, CardBody, Row, Col, Button } from 'reactstrap';
import IErrorHandler from '../components/ErrorHandler';

class CreateRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Number: '',
      Capacity: '',
      IsRA: false,
      IsMale: true,
      IsReserved: false,
      Comments: '',
      redirectToRooms: false,
    };
  
    this.ErrorHandler = new IErrorHandler('create room', this.props.showError);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirectToRooms = this.redirectToRooms.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  redirectToRooms() {
    if (this.state.redirectToRooms) {
      return <Redirect to="/rooms" />;
    } else {
      return '';
    }
  }

  handleSubmit() {
    if (this.state.Number === '' ||
        this.state.Capacity === '') {
      this.props.showError('All fields are required.');
    } else {
      const room = {
        ...this.state,
        Capacity: parseInt(this.state.Capacity),
        IsMale: this.state.IsMale == true,
      };

      delete room.redirectToRooms;

      
      fetch(`${config.endpoint}/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.props.accessToken}`,
        },
        body: JSON.stringify(room)
      })
        .then(res => {
          if (!res.ok) { throw res; }
          return res.json();
        })
        .then(() => this.setState({ redirectToRooms: true }))
        .catch((error) => {
          this.ErrorHandler.catchStep(error);
        })
        .then((error) => {
          this.ErrorHandler.thenStep(error);
        });
        
    }
  }

  handleInput(e) {
    const change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  handleCheck(e) {
    const change = {};
    change[e.target.name] = !this.state[e.target.name];
    this.setState(change);
  }

  render() {
    return (
      <div id="rooms">
        {this.redirectToRooms()}
        <MainLayout
          title="Rooms | Create Room"
          secondaryNav={[
            {
              title: 'All Rooms',
              href: '/rooms/'
            },
            {
              title: 'Create Room',
              href: '/rooms/create'
            }
          ]}
        >
          <Row>
            <Col md="6">
              <Card>
                <CardBody>
                  <FormGroup>
                    <Label for="Number">Number</Label>
                    <Input type="text" name="Number" onChange={this.handleInput} value={this.state.Number} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="Capacity">Capacity</Label>
                    <Input type="text" name="Capacity" onChange={this.handleInput} value={this.state.Capacity} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="Comments">Comments</Label>
                    <Input type="text" name="Comments" onChange={this.handleInput} value={this.state.Comments} />
                  </FormGroup>
                </CardBody>
              </Card>
            </Col>
            <Col md="6">
              <Card>
                <CardBody>
                  <FormGroup>
                    <Label for="CreditHours">Sex</Label>
                    <Input type="select" name="IsMale" onChange={this.handleInput} value={this.props.IsMale}>
                      <option defaultValue value={true}>Male</option>
                      <option value={false}>Female</option>
                    </Input>
                  </FormGroup><br />
                  <FormGroup check>
                    <Label check>
                      <Input type="checkbox" name="IsRA" onClick={this.handleCheck} checked={this.props.IsRA} />{' '}
                      Resident Assistant
                    </Label>
                  </FormGroup><br />
                  <FormGroup check>
                    <Label check>
                      <Input type="checkbox" name="IsReserved" onClick={this.handleCheck} checked={this.props.IsReserved} />{' '}
                      Is Reserved
                    </Label>
                  </FormGroup><br />
                </CardBody>
              </Card>
              <Button color="primary" onClick={this.handleSubmit} style={{ marginTop: '1rem' }}>Create</Button>
            </Col>
          </Row>
        </MainLayout>
      </div>
    );
  }
}

export default CreateRoom;
