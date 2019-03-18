import React from 'react';
import CSVReader from 'react-csv-reader';
import PropTypes from 'prop-types';

CSVInput.PropTypes = {
  onFileLoaded: PropTypes.func,
  onError: PropTypes.func,
  label: PropTypes.string,
  cssClass: PropTypes.string,
};

const CSVInput = props => (
  <div className="csv-input">
    <CSVReader
      parserOptions={{ header: true }}
      cssClass={props.cssClass}
      label={props.label}
      onFileLoaded={props.onFileLoaded}
      onError={props.onError}
    />
  </div>
);

export default CSVInput;
