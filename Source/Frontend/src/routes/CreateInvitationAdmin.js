import React from 'react';
import MainLayout from '../components/MainLayout';
import { Row, Col, Card, CardBody, FormGroup, Input, Button, Label } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class CreateInvitationAdmin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      FromStudentId: '',
      ToStudentId: '',
      RoomNumber: '',
      redirectToInvitations: false,
    };

    this.handleInput = this.handleInput.bind(this);
    this.redirectToInvitations = this.redirectToInvitations.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  redirectToInvitations() {
    if (this.state.redirectToInvitations) {
      return <Redirect to="/invitations" />
    } else {
      return '';
    }
  }

  handleInput(e) {
    const change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  handleSubmit() {
    if (this.state.FromStudentId === '' ||
        this.state.ToStudentId === '' ||
        this.state.RoomNumber === '') {
      this.props.showError('All fields are required');
    } else {
      const invitation = { ...this.state };
      delete invitation.redirectToInvitations;

      /*
      fetch(`${config.endpoint}/invitation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.props.accessToken}`,
        },
        body: JSON.stringify(invitation)
      })
        .then(res => res.json())
        .then(() => this.setState({ redirectToInvitations: true }))
        .catch((error) => {
          this.props.showError('Could not create invitation.');
          console.log(error);
        });
        */
    }
  }

  render() {
    return (
      <div id="invitations">
        <MainLayout
          title="Invitations | Create Invitation"
          secondaryNav={[
            {
              title: 'Create Invitation',
              href: 'invitations/admin/create'
            }
          ]}
        >
          <Row>
            {this.redirectToInvitations()}
            <Col md="6">
              <Card>
                <CardBody>
                  <FormGroup>
                    <Label for="FromStudentId">From (Student ID):</Label>
                    <Input type="text" name="FromStudentId" id="FromStudentId" value={this.state.FromStudentId} onChange={this.handleInput} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="ToStudentId">To (Student ID):</Label>
                    <Input type="text" name="ToStudentId" id="ToStudentId" value={this.state.ToStudentId} onChange={this.handleInput} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="RoomNumber">Room Number</Label>
                    <Input type="text" name="RoomNumber" id="RoomNumber" value={this.state.RoomNumber} onChange={this.handleInput} />
                  </FormGroup>
                  <Button color="primary" onClick={this.handleSubmit}>Create Invitation</Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </MainLayout>
      </div>
    );
  }
}

export default CreateInvitationAdmin;
