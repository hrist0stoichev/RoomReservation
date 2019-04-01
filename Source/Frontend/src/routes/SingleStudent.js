import React, { Component } from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row, Col, Input, FormGroup, Label, Button } from 'reactstrap';
import MainLayout from '../components/MainLayout';
import './SingleView.scss';
import config from '../config';

export class SingleStudent extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleInput = this.handleInput.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  componentWillMount() {
    const url = window.location.href;
    const id = url.split('id=')[1];
    
    fetch(`${config.endpoint}/students/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.accessToken}`,
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState(res);
      })
      .catch(error => {
        this.props.showError('Could not fetch student information. Try again later.');
        console.log(error);
      });
  }

  handleInput(e) {
    const change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  handleCheckbox(e) {
    const change = {};
    change[e.target.name] = !this.state[e.target.name];
    this.setState(change);
  }

  handleSave() {
    if (window.confirm('Do you want to save changes?')) {
      fetch(`${config.endpoint}/students/${this.state.Id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.props.accessToken}`,
        },
        body: JSON.stringify(this.state)
      })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(error => {
          this.props.showError('Could not fetch student information. Try again later.');
          console.log(error);
        });
    }
  }

  render() {
    return (
      <MainLayout
          title="Students"
          secondaryNav={[
            {
              title: 'All Students',
              href: '/students/'
            },
            {
              title: 'Create Student',
              href: '/students/create'
            },
            {
              title: 'Bulk Add Students',
              href: '/students/bulk-add'
            }
          ]}
        >
        <div id="single-view" style={{ marginBottom: '3em' }}>
        {console.log(this.state.student)}
          <Row>
            <Col>
              <ListGroup>
                <ListGroupItem>
                  <ListGroupItemHeading>ID</ListGroupItemHeading>
                  <ListGroupItemText>
                    <Input type="text" name="Id" onChange={this.handleInput} value={this.state.Id} />
                  </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>First Name</ListGroupItemHeading>
                  <ListGroupItemText>
                    <Input type="text" name="FirstName" onChange={this.handleInput} value={this.state.FirstName} />
                  </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Middle Name</ListGroupItemHeading>
                  <ListGroupItemText>
                    <Input type="text" name="MiddleName" onChange={this.handleInput} value={this.state.MiddleName} />
                  </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Last Name</ListGroupItemHeading>
                  <ListGroupItemText>
                    <Input type="text" name="LastName" onChange={this.handleInput} value={this.state.LastName} />
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
                  <ListGroupItemHeading>Email</ListGroupItemHeading>
                  <ListGroupItemText>
                    <Input type="text" name="Email" onChange={this.handleInput} value={this.state.Email} />
                  </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Current Room Number</ListGroupItemHeading>
                  <ListGroupItemText>
                    <Input type="text" name="CurrentRoomNumber" onChange={this.handleInput} value={this.state.CurrentRoomNumber} />
                  </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Invitations Received</ListGroupItemHeading>
                  <ListGroupItemText>
                    {
                      this.state.InvitationsReceived && this.state.InvitationsReceived.length > 0 ?
                      this.state.InvitationsReceived.map(inv => <div><span>{inv.FromStudentId}</span> <span>{inv.ToStudentId}</span></div>)
                      : 'N/A'
                    }
                  </ListGroupItemText>
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col>
              <ListGroup>
                <ListGroupItem>
                <ListGroupItemHeading>Credit Hours</ListGroupItemHeading>
                  <ListGroupItemText>
                    <Input type="text" name="CreditHours" onChange={this.handleInput} value={this.state.CreditHours} />
                  </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>On Campus</ListGroupItemHeading>
                  <ListGroupItemText><Input type="checkbox" name="IsOnCampus" onChange={this.handleCheckbox} checked={this.state.IsOnCampus} /></ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Resident Assistant</ListGroupItemHeading>
                  <ListGroupItemText><Input type="checkbox" name="IsRA" onChange={this.handleCheckbox} checked={this.state.IsRA} /></ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Registration Time</ListGroupItemHeading>
                  <ListGroupItemText>{this.state.RegistrationTime || 'N/A'}</ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Comments</ListGroupItemHeading>
                  <ListGroupItemText>
                    <Input type="text" name="Comments" onChange={this.handleInput} value={this.state.Comments} />
                  </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Invitations Sent</ListGroupItemHeading>
                  <ListGroupItemText>
                    {
                      this.state.InvitationsSent && this.state.InvitationsSent.length > 0 ?
                      this.state.InvitationsSent.map(inv => <div><span>{inv.FromStudentId}</span> <span>{inv.ToStudentId}</span></div>)
                      : 'N/A'
                    }
                  </ListGroupItemText>
                </ListGroupItem>
              </ListGroup>
              <Button style={{ margin: '1em' }} onClick={this.handleSave.bind(this)}>Save Changes</Button>
            </Col>
          </Row>
        </div>
      </MainLayout>
    );
  };
};

export default SingleStudent;
