import React from 'react';
import MainLayout from '../components/MainLayout';
import { Row, Col, Card, CardTitle, CardBody, CardText } from 'reactstrap';

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
              <Card>
                <CardTitle>Room</CardTitle>
                <CardBody>
                  
                </CardBody>
              </Card>
            </Col>
            <Col>
            </Col>
          </Row>
        </MainLayout>
      </div>
    );
  }
}

export default Dashboard;
