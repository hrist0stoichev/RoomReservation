import React from 'react';
import Loader from '../Loader';
import './NewCampaignForm.scss';

const CurrentCampaign = (props) => {
  if (props.campaign) {
    return (
      <div>
        <p className="phase-title">Campaign Starting Date</p>
        <p>{props.campaign.phase0start.split('T').join(' ')}</p>
        <p className="phase-title">Phase 1</p>
        <p>Start: {props.campaign.phase1start.split('T').join(' ')}</p>
        <p>End: {props.campaign.phase1end.split('T').join(' ')}</p>
        <p className="phase-title">Phase 2</p>
        <p>Start: {props.campaign.phase2start.split('T').join(' ')}</p>
        <p>End: {props.campaign.phase2end.split('T').join(' ')}</p>
        <p className="phase-title">Phase 3</p>
        <p>Start: {props.campaign.phase3start.split('T').join(' ')}</p>
        <p>End: {props.campaign.phase3end.split('T').join(' ')}</p>
      </div>
    );
  } else {
    return (
      <Loader />
    );
  }
};

export default CurrentCampaign;
