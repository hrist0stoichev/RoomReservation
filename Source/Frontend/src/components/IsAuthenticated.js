import React from 'react';

const IsAuthenticated = (props) => {
  if (props.isAuthenticated) {
    return props.children;
  } else {
    return '';
  }
};

export default IsAuthenticated;
