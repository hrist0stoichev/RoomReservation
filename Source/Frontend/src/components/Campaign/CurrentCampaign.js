import React, { Component } from 'react';

export class CurrentCampaign extends Component {
  componentDidMount() {
    this.props.getCurrentCampaign();
  }
  
  render() {
    return (
      <div id="current-campaign">
        
      </div>
    );
  }
}

export default CurrentCampaign;
