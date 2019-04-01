import React from 'react';
import MainLayout from '../components/MainLayout';
import { Redirect } from 'react-router-dom';
import config from '../config';
import { FormGroup, Label, Input, Card, CardBody, Row, Col, Button } from 'reactstrap';

class CreateStudent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Id: '',
      FirstName: '',
      MiddleName: '',
      LastName: '',
      CreditHours: '',
      Email: '',
      IsMale: true,
      IsRA: false,
      IsRoomConfirmed: false,
      IsOnCampus: false,
      Comments: '',
      redirectToStudents: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirectToStudents = this.redirectToStudents.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  redirectToStudents() {
    if (this.state.redirectToStudents) {
      return <Redirect to="/students" />;
    } else {
      return '';
    }
  }

  handleSubmit() {
    if (this.state.Id === '' ||
        this.state.FirstName === '' ||
        this.state.LastName === '' ||
        this.state.CreditHours === '' ||
        this.state.Email === '') {
      this.props.showError('All fields are required.');
    } else {
      const student = {
        ...this.state,
        CreditHours: parseInt(this.state.CreditHours),
      };

      delete student.redirectToStudents;

      fetch(`${config.endpoint}/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.props.accessToken}`,
        },
        body: JSON.stringify(student)
      })
        .then(res => res.json())
        .then(() => this.setState({ redirectToStudents: true }))
        .catch((error) => {
          this.props.showError('Could not create student.');
          console.log(error);
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
      <div id="students">
        {this.redirectToStudents()}
        <MainLayout
          title="Students | Create Student"
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
          <Row>
            <Col md="6">
              <Card>
                <CardBody>
                  <FormGroup>
                    <Label for="Id">Student ID</Label>
                    <Input type="text" name="Id" onChange={this.handleInput} value={this.state.Id} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="FirstName">First Name</Label>
                    <Input type="text" name="FirstName" onChange={this.handleInput} value={this.state.FirstName} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="MiddleName">Middle Name</Label>
                    <Input type="text" name="MiddleName" onChange={this.handleInput} value={this.state.MiddleName} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="LastName">Last Name</Label>
                    <Input type="text" name="LastName" onChange={this.handleInput} value={this.state.LastName} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="Email">Email</Label>
                    <Input type="text" name="Email" onChange={this.handleInput} value={this.state.Email} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="CreditHours">Credit Hours</Label>
                    <Input type="text" name="CreditHours" onChange={this.handleInput} value={this.state.CreditHours} />
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
                      <Input type="checkbox" name="IsRoomConfirmed" onClick={this.handleCheck} checked={this.props.IsRoomConfirmed} />{' '}
                      Confirmed Room
                    </Label>
                  </FormGroup><br />
                  <FormGroup check>
                    <Label check>
                      <Input type="checkbox" name="IsOnCampus" onClick={this.handleCheck} checked={this.props.IsOnCampus} />{' '}
                      On Campus
                    </Label>
                  </FormGroup><br />
                  <FormGroup>
                    <Label for="Comments">Comments</Label>
                    <Input type="text" name="Comments" onChange={this.handleInput} value={this.state.Comments} />
                  </FormGroup>
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

export default CreateStudent;
