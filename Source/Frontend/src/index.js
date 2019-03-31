import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import Router from './containers/Router';
import Alerts from './containers/Alerts';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'rc-datetime-picker/dist/picker.css';
import { authenticateWithToken } from './actions/auth';
import './index.scss';

import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();

// Check for token and update application state if required
const token = localStorage.getItem('token');
if (token) {
  store.dispatch(authenticateWithToken(token, window.location.href));
}

ReactDOM.render(
  <Provider store={store}>
    <Alerts />
    <Router />
  </Provider>,
  document.getElementById('root')
);
