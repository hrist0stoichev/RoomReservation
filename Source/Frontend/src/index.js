import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import Router from './containers/Router';

import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root')
);
