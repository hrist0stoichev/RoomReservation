import React from 'react';

const IsAuthenticated = (props) => {
  if (props.isAuthenticated) {
    return <div>{props.children}</div>;
  } else {
    return '';
  }
};

export default IsAuthenticated;
