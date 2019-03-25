import React from 'react';
import MainLayout from '../components/MainLayout';
import { Row, Col, Card, CardTitle, CardBody, CardText } from 'reactstrap';
import NewCampaignForm from '../components/Campaign/NewCampaignForm';
import CurrentCampaign from '../components/Campaign/CurrentCampaign';

class Campaign extends React.Component {
  componentWillMount() {
    this.props.getCampaign();
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
                    <CurrentCampaign campaign={this.props.campaign} />
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card>
                <CardBody>
                  <CardTitle>Start Campaign</CardTitle>
                  <CardText>
                    <NewCampaignForm getCampaign={this.props.getCampaign} createCampaign={this.props.createCampaign} isDone={this.props.isDone} isLoading={this.props.isLoading} />
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
