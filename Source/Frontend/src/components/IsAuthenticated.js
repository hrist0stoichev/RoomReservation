import React from 'react';

const IsAuthenticated = (props) => {
  if (props.IsAuthenticated) {
    return this.props.children;
  } else {
    return '';
  }
};

export default IsAuthenticated;
