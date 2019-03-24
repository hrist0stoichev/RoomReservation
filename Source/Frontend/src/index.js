import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import Router from './containers/Router';
import Alerts from './containers/Alerts';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'rc-datetime-picker/dist/picker.css';

import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Alerts />
    <Router />
  </Provider>,
  document.getElementById('root')
);
