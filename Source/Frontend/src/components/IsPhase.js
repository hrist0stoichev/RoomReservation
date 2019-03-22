import React from 'react';

const IsPhase = (props) => {
  if (props.phase === props.inputPhase) {
    return this.props.children;
  } else {
    return '';
  }
};

export default IsPhase;
