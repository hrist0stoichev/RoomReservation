import React from 'react';
import MainLayout from '../components/MainLayout';
import { Redirect } from 'react-router-dom';
import config from '../config';
import { FormGroup, Label, Input, Card, CardBody, Row, Col, Button } from 'reactstrap';
import IErrorHandler from '../components/ErrorHandler';

class CreateApartment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      room1: '',
      room2: '',
      redirectToApartments: false,
    };

    this.ErrorHandler = new IErrorHandler('create apartment', this.props.showError);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirectToApartments = this.redirectToApartments.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  redirectToApartments() {
    if (this.state.redirectToApartments) {
      return <Redirect to="/apartments" />;
    } else {
      return '';
    }
  }

  handleSubmit() {
    if (this.state.room1 === '' || this.state.room2 === '') {
      this.props.showError('All fields are required.');
    } else {
      fetch(`${config.endpoint}/rooms/apartments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.props.accessToken}`,
        },
        body: JSON.stringify({
          Room1Number: this.state.room1,
          Room2Number: this.state.room2
        })
      })
        .then(res => {
          if (!res.ok) { throw res; }
          this.setState({redirectToApartments: true});
        })
        .catch((error) => {
          return this.ErrorHandler.catchStep(error);
        })
        .then(error => {
          this.ErrorHandler.thenStep(error);
        });
    }
  }

  handleInput(e) {
    const change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  render() {
    return (
      <div id="apartments">
        {this.redirectToApartments()}
        <MainLayout
          title="Apartments | Create Apartment"
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
          <Row>
            <Col md="6">
              <Card>
                <CardBody>
                  <FormGroup>
                    <Label for="room1">Room #1</Label>
                    <Input type="text" name="room1" onChange={this.handleInput} value={this.state.room1} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="room1">Room #2</Label>
                    <Input type="text" name="room2" onChange={this.handleInput} value={this.state.room2} />
                  </FormGroup>
                  <Button color="primary" onClick={this.handleSubmit}>Create</Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </MainLayout>
      </div>
    );
  }
}

export default CreateApartment;
