import React, { Component } from 'react'
import config from '../../config';

class RoomsGrid extends Component {
  componentDidMount() {
    console.log(this.props);
    console.log(this.props.accessToken);
    fetch(`${config.endpoint}/students`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.accessToken}`
      }
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(error => console.log('error', error));
  }
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default RoomsGrid;
