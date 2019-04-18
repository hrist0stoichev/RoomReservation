import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Card, CardBody, Row, Col, CardTitle, CardText, ListGroup, ListGroupItem } from 'reactstrap';
import MainLayout from '../components/MainLayout';
import CSVInput from '../components/CSVInput';
import './StudentsBulkAdd.scss';

class Students extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      submitDisabled: true,
    }
    this.fileHandler = this.fileHandler.bind(this);
    this.renderDone = this.renderDone.bind(this);
    this.buttonHandler = this.buttonHandler.bind(this);
  }

  buttonHandler() {
    this.props.bulkAddStudents(this.state.data);
  }

  fileHandler(data) {
    this.setState({
      submitDisabled: false,
      data
    });
  }

  renderDone() {
    if (this.props.isDone) {
      this.props.bulkAddDone(false);
      return <Redirect to="/students" />;
    } else {
      return '';
    }
  }

  render() {
    const fieldStyle = {fontSize: '0.75em', fontWeight: 'bold', textTransform: 'uppercase'};
    return (
      <div id="students-bulk-add">
        {this.renderDone()}
        <MainLayout
          title="Students | Bulk Add"
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
            <Col md="6" className="pb-3">
              <Card>
                <CardBody>
                  <CSVInput label="CSV File" className="csv-input" onFileLoaded={this.fileHandler} onError={(error) => { this.props.showError(error); }}/>
                </CardBody>
              </Card>
            </Col>
            <Col md="6" className="pb-3">
              <Card>
                <CardBody>
                  <CardTitle><b>CSV File Field Names</b></CardTitle>
                  <CardText>
                    <p>The possible field names are described below. Make sure that there are no empty lines in the CSV file.</p>
                    <ListGroup style={fieldStyle}>
                      <ListGroupItem>ID</ListGroupItem>
                      <ListGroupItem>FIRST NAME / FIRSTNAME</ListGroupItem>
                      <ListGroupItem>MIDDLE NAME / MIDDLENAME</ListGroupItem>
                      <ListGroupItem>LAST NAME / LASTNAME</ListGroupItem>
                      <ListGroupItem>CREDIT HOURS / EARNED CR HRS / CREDITHOURS / EARNED CRHRS / EARNEDCRHRS / EARNEDCR HRS</ListGroupItem>
                      <ListGroupItem>EMAIL / E-MAIL / EMAILADDR / EMAIL ADDR</ListGroupItem>
                      <ListGroupItem>SEX / GENDER</ListGroupItem>
                    </ListGroup>
                    <br />
                    <p style={fieldStyle}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Note: acceptable values for Sex / Gender:</p>
                    <p style={fieldStyle}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MALE / FEMALE / M / F</p>
                    <br />
                    <p>All field names are case insensitive. This means that lowercase or uppercase letters do not matter.</p>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Button onClick={this.buttonHandler} disabled={this.state.submitDisabled}>Submit</Button>
        </MainLayout>
      </div>
    );
  }
}

export default Students;
