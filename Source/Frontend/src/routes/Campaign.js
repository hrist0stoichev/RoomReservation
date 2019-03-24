import React from 'react';
import MainLayout from '../components/MainLayout';
import { Row, Col, Card, CardTitle, CardBody, CardText } from 'reactstrap';
import NewCampaignForm from '../components/Campaign/NewCampaignForm';

class Campaign extends React.Component {
  componentWillMount() {
    console.log('TOTO::fetch campaign data');
  }

  render() {
    return (
      <div id="campaign">
        <MainLayout
          title="Campaign"
          secondaryNav={[]}
        >
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <CardTitle>Current Campaign</CardTitle>
                  <CardText>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card>
                <CardBody>
                  <CardTitle>Start Campaign</CardTitle>
                  <CardText>
                    <NewCampaignForm createCampaign={this.props.createCampaign} />
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </MainLayout>
      </div>
    );
  }
}

export default Campaign;
