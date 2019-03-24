import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Card, CardBody, Row, Col } from 'reactstrap';
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
    return (
      <div id="students-bulk-add">
        {this.renderDone()}
        <MainLayout
          title="Bulk Add Students"
          secondaryNav={[]}
        >
          <Row>
            <Col md="6" className="pb-3">
              <Card>
                <CardBody>
                  <CSVInput label="CSV File" className="csv-input" onFileLoaded={this.fileHandler} onError={(error) => { this.props.showError(error); }}/>
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
