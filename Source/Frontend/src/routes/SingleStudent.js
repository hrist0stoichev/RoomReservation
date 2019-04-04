import React, { Component } from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row, Col, Input, FormGroup, Label, Button } from 'reactstrap';
import MainLayout from '../components/MainLayout';
import './SingleView.scss';
import config from '../config';
import { Redirect } from 'react-router-dom';
import IErrorHandler from '../components/ErrorHandler';
import {DatetimePickerTrigger} from 'rc-datetime-picker';
import moment from 'moment';

const dateFilter = date => date.toISOString().split('.')[0];

export class SingleStudent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Id: '',
      FirstName: '',
      MiddleName: '',
      LastName: '',
      RegistrationTime: '',
      CreditHours: 0,
      Email: '',
      IsMale: true,
      IsRA: false,
      IsOnCampus: false,
      Comments: '',
      CurrentRoomNumber: '',
      hasRegistrationTime: false,
      RegistrationTime: null,
      InvitationsSent: [],
      InvitationsReceived: []
    };

    this.ErrorHandler = new IErrorHandler('update student', this.props.showError);

    this.handleInput = this.handleInput.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.redirectToStudents = this.redirectToStudents.bind(this);
    this.handleRegTime = this.handleRegTime.bind(this);
    this.renderRegistrationTime = this.renderRegistrationTime.bind(this);
    this.newRegTime = this.newRegTime.bind(this);
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
        if (!res.RegistrationTime) {
          this.setState({
            ...res,
            RegistrationTime: null
          })
        } else {
          this.setState({
            ...res,
            hasRegistrationTime: true,
            RegistrationTime: moment(res.RegistrationTime)
          });
        }
      })
      .catch(error => {
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
  
  handleRegTime(moment) {
    this.setState({ RegistrationTime: moment });
  }

  redirectToStudents() {
    if (this.state.redirectToStudents) {
      return <Redirect to="students" />;
    } else {
      return '';
    }
  }

  handleSave() {
    if (window.confirm('Do you want to save changes?')) {
      console.log(this.state);
      fetch(`${config.endpoint}/students/${this.state.Id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.props.accessToken}`,
        },
        body: JSON.stringify({
          ...this.state,
          RegistrationTime: this.state.RegistrationTime ? dateFilter(this.state.RegistrationTime) : null
        })
      })
        .then(res => {
          if (!res.ok) throw res;
          return res.json();
        })
        .then(() => this.setState({ redirectToStudents: true }))
        .catch(error => this.ErrorHandler.catchStep(error))
        .then(error => this.ErrorHandler.thenStep(error));
    }
  }

  newRegTime() {
    this.setState({
      hasRegistrationTime: true,
      RegistrationTime: moment()
    });
  }

  renderRegistrationTime() {
    if (this.state.hasRegistrationTime) {
      return (
        <DatetimePickerTrigger
          moment={this.state.RegistrationTime}
          onChange={(moment) => { this.handleRegTime(moment); }}>
          <Input type="text" value={this.state.RegistrationTime.format('YYYY-MM-DD HH:mm')} readOnly />
        </DatetimePickerTrigger>
      );
    } else {
      return (
        <div>
          <p>N/A</p>
          <Button onClick={this.newRegTime}>Set Registration Time</Button>
        </div>
      );
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
          {this.redirectToStudents()}
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
                  <ListGroupItemHeading>Comments</ListGroupItemHeading>
                  <ListGroupItemText>
                    <Input type="text" name="Comments" onChange={this.handleInput} value={this.state.Comments} />
                  </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Registration Time</ListGroupItemHeading>
                  <ListGroupItemText>
                    {this.renderRegistrationTime()}
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
