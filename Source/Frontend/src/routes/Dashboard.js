import React from 'react';
import MainLayout from '../components/MainLayout';
import { Row, Col, Card, CardTitle, CardBody, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { connect }  from 'react-redux';
import IsStudent from '../containers/IsStudent';

function mapStateToProps(state) {
  return {
    phase: state.auth.phase
  };
}

function mapDispatchToProps(state) {
  return {

  };
}

class Dashboard extends React.Component {
  render() {
    return (
      <div id="dashboard">
        <MainLayout
          title="Dashboard"
          secondaryNav={[]}
        >
          <Row>
            <Col>
              <IsStudent>
                <Card>
                  <CardTitle>Your Room</CardTitle>
                  <CardBody></CardBody>
                </Card>
              </IsStudent>
              <IsStudent>
                <Card>
                  <CardTitle>Current Campaign</CardTitle>
                  <CardBody>
                    <ListGroup>
                      <ListGroupItem>
                        <ListGroupItemHeading>Current Phase</ListGroupItemHeading>
                        <ListGroupItemText>{this.props.phase}</ListGroupItemText>
                      </ListGroupItem>
                    </ListGroup>
                  </CardBody>
                </Card>
              </IsStudent>
            </Col>
            <Col>
              <IsStudent>
                <Card>
                  <CardTitle>Student Details</CardTitle>
                  <CardBody></CardBody>
                </Card>
              </IsStudent>
              <IsStudent>
                <Card>
                  <CardTitle>Phase Information</CardTitle>
                  <CardBody></CardBody>
                </Card>
              </IsStudent>
            </Col>
          </Row>
        </MainLayout>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
