import React from 'react';
import { Input, FormGroup, Label, Row, Col, Button } from 'reactstrap';
import {DatetimePickerTrigger} from 'rc-datetime-picker';
import moment from 'moment';
import './NewCampaignForm.scss';

class NewCampaignForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phase1start: moment(),
      phase1end: moment(),
      phase2start: moment(),
      phase2end: moment(),
      phase3start: moment(),
      phase3end: moment(),
    };
    this.handleChange = this.handleChange.bind(this);
    this.buttonHandler = this.buttonHandler.bind(this);
  }

  handleChange(name, date) {
    console.log(date.format('YYYY-MM-DD HH:mm'));
    let change = {};
    change[name] = date;
    this.setState(change);
  }

  buttonHandler() {
    this.props.createCampaign({
      phase1start: this.state.phase1start,
      phase1end: this.state.phase1end,
      phase2start: this.state.phase2start,
      phase2end: this.state.phase2end,
      phase3start: this.state.phase3start,
      phase3end: this.state.phase3end,
    })
  }

  render() {
    return (
      <div>
        <p className="phase-title">Phase 1</p>
        <Row>
          <Col>
            <FormGroup>
              <Label for="phase1start">Start</Label>
              <DatetimePickerTrigger
                moment={this.state.phase1start}
                onChange={(moment) => { this.handleChange('phase1start', moment); }}>
                <Input type="text" value={this.state.phase1start.format('YYYY-MM-DD HH:mm')} readOnly />
              </DatetimePickerTrigger>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="phase1end">End</Label>
              <DatetimePickerTrigger
                moment={this.state.phase1end}
                onChange={(moment) => { this.handleChange('phase1end', moment); }}>
                <Input type="text" value={this.state.phase1end.format('YYYY-MM-DD HH:mm')} readOnly />
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
                moment={this.state.phase2start}
                onChange={(moment) => { this.handleChange('phase2start', moment); }}>
                <Input type="text" value={this.state.phase2start.format('YYYY-MM-DD HH:mm')} readOnly />
              </DatetimePickerTrigger>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="phase1end">End</Label>
              <DatetimePickerTrigger
                moment={this.state.phase2end}
                onChange={(moment) => { this.handleChange('phase2end', moment); }}>
                <Input type="text" value={this.state.phase2end.format('YYYY-MM-DD HH:mm')} readOnly />
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
                moment={this.state.phase3start}
                onChange={(moment) => { this.handleChange('phase3start', moment); }}>
                <Input type="text" value={this.state.phase3start.format('YYYY-MM-DD HH:mm')} readOnly />
              </DatetimePickerTrigger>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="phase1end">End</Label>
              <DatetimePickerTrigger
                moment={this.state.phase3end}
                onChange={(moment) => { this.handleChange('phase3end', moment); }}>
                <Input type="text" value={this.state.phase3end.format('YYYY-MM-DD HH:mm')} readOnly />
              </DatetimePickerTrigger>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button color="primary" className="mt-3" onClick={this.buttonHandler}>Start Campaign</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default NewCampaignForm;
