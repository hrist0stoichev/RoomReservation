import React from 'react';

const IsAdmin = (props) => {
  if (props.isAdmin) {
    return props.children;
  } else {
    return '';
  }
};

export default IsAdmin;
