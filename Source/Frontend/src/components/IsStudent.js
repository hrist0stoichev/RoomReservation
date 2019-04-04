import React from 'react';

const IsStudent = (props) => {
  if (props.isStudent) {
    return props.children;
  } else {
    return '';
  }
};

export default IsStudent;
