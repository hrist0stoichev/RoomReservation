import React from 'react';
import { Input, FormGroup, Label, Row, Col, Button } from 'reactstrap';
import {DatetimePickerTrigger} from 'rc-datetime-picker';
import Loader from '../Loader';
import moment from 'moment';
import './NewCampaignForm.scss';
import config from '../../config';

const dateFilter = date => date.toISOString().split('.')[0];

class NewCampaignForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Phase1Start: moment(),
      Phase2Start: moment(),
      Phase3Start: moment(),
      Phase3End: moment(),
    };
    this.handleChange = this.handleChange.bind(this);
    this.buttonHandler = this.buttonHandler.bind(this);
    this.stopHandler = this.stopHandler.bind(this);
  }

  stopHandler() {
    fetch(`${config.endpoint}/campaigns`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.accessToken}`,
      }
    })
      .catch(error => {
        this.props.showError('Could not stop the campaign. Try again later.');
        console.log(error);
      });
  }

  handleChange(name, date) {
    let change = {};
    change[name] = date;
    this.setState(change);
  }

  buttonHandler() {
    this.props.createCampaign({
      Phase1Start: dateFilter(this.state.Phase1Start),
      Phase2Start: dateFilter(this.state.Phase2Start),
      Phase3Start: dateFilter(this.state.Phase3Start),
      Phase3End: dateFilter(this.state.Phase3End),
    });
  }

  render() {
    if (this.props.isLoading) {
      return <Loader />;
    } else {
      return (
        <div>
          <p className="phase-title">Phase 1</p>
          <Row>
            <Col>
              <FormGroup>
                <Label for="phase1start">Start</Label>
                <DatetimePickerTrigger
                  moment={this.state.Phase1Start}
                  onChange={(moment) => { this.handleChange('Phase1Start', moment); }}>
                  <Input type="text" value={this.state.Phase1Start.format('YYYY-MM-DD HH:mm')} readOnly />
                </DatetimePickerTrigger>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="phase1end">End</Label>
                <DatetimePickerTrigger
                  moment={this.state.Phase2Start}
                  onChange={(moment) => { this.handleChange('Phase2Start', moment); }}>
                  <Input type="text" value={this.state.Phase2Start.format('YYYY-MM-DD HH:mm')} readOnly />
                </DatetimePickerTrigger>
              </FormGroup>
            </Col>
          </Row>
          <p className="phase-title">Phase 2</p>
          <Row>
            <Col>
              <FormGroup>
                <Label for="phase1start">Start</Label>
                <DatetimePickerTrigger
                  moment={this.state.Phase2Start}
                  onChange={(moment) => { this.handleChange('Phase2Start', moment); }}>
                  <Input type="text" value={this.state.Phase2Start.format('YYYY-MM-DD HH:mm')} readOnly />
                </DatetimePickerTrigger>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="phase1end">End</Label>
                <DatetimePickerTrigger
                  moment={this.state.Phase3Start}
                  onChange={(moment) => { this.handleChange('Phase3Start', moment); }}>
                  <Input type="text" value={this.state.Phase3Start.format('YYYY-MM-DD HH:mm')} readOnly />
                </DatetimePickerTrigger>
              </FormGroup>
            </Col>
          </Row>
          <p className="phase-title">Phase 3</p>
          <Row>
            <Col>
              <FormGroup>
                <Label for="phase1start">Start</Label>
                <DatetimePickerTrigger
                  moment={this.state.Phase3Start}
                  onChange={(moment) => { this.handleChange('Phase3Start', moment); }}>
                  <Input type="text" value={this.state.Phase3Start.format('YYYY-MM-DD HH:mm')} readOnly />
                </DatetimePickerTrigger>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="phase1end">End</Label>
                <DatetimePickerTrigger
                  moment={this.state.Phase3End}
                  onChange={(moment) => { this.handleChange('Phase3End', moment); }}>
                  <Input type="text" value={this.state.Phase3End.format('YYYY-MM-DD HH:mm')} readOnly />
                </DatetimePickerTrigger>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
            {console.log(this.props.phase)}
              {
                this.props.phase !== -1 ? <Button color="primary" className="mt-3" onClick={this.stopHandler}>Stop Campaign</Button>
                : <Button color="primary" className="mt-3" onClick={this.buttonHandler}>Start Campaign</Button>
              }
            </Col>
          </Row>
        </div>
      );
    }
  }
}

export default NewCampaignForm;
