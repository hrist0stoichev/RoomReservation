import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import Router from './containers/Router';
import Alerts from './containers/Alerts';
import Header from './components/Header';
import IsAuthenticated from './containers/IsAuthenticated';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Alerts />
    <IsAuthenticated>
      <Header />
    </IsAuthenticated>
    <Router />
  </Provider>,
  document.getElementById('root')
);
