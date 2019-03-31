import React from 'react';
import MainLayout from '../components/MainLayout';
import { Row, Col, Card, CardBody, Input, Button, Label, FormGroup } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class CreateInvitation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      studentId: '',
      done: false,
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    this.setState({ studentId: e.target.value });
  }

  handleSubmit() {
    this.props.createInvitation(this.state.studentId);
    this.setState({ done: true });
  }

  done() {
    if (this.state.done) {
      return <Redirect to='/rooms' />
    } else {
      return '';
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