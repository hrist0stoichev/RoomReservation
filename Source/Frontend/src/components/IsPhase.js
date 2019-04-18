import React from 'react';

const IsPhase = (props) => {
  if (props.phase == props.inputPhase) {
    return this.props.children;
  } else {
    return <p style={{ width: '100%', textAlign: 'center' }}>{props.elseMessage}</p>;
  }
};

export default IsPhase;
