import React from 'react';
import CSVReader from 'react-csv-reader';

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
