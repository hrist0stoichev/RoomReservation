import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './TOS.scss';
import config from '../config';

class TOS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ContractContent: '', 
      visible: true,
    };
  }

  buttonHandler = () => {
    this.setState({ visible: false });
  }
  
  componentWillMount() {
    fetch(`${config.endpoint}/contract`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.auth.accessToken}`,
      }
    })
      .then(res => res.json())
      .then(res => this.setState({ ContractContent: res.ContractContent }))
      .catch(error => console.log(error));
  }

  render() {
    if (this.state.visible) {
      return (
        <div className="tos-overlay">
          <div className="tos-container">
            {this.state.ContractContent} 
          </div>
          <Button className="tos-btn" color="primary" onClick={this.buttonHandler}>Accept the Contract</Button>
        </div>
      );
    } else {
      return '';
    }
  }
}

export default TOS;