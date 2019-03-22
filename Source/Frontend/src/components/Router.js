import React from 'react';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Login from '../containers/LoginContainer';
import Main from '../routes/Main';

const authentication = (props, component) => {
  if (props.isAuthenticated) {
    return component;
  } else {
    return <Redirect to="/" />;
  }
};

const isAdmin = (props, component) => {
  if (props.isAdmin) {
    return component;
  } else {
    return <Redirect to="/" />;
  }
};

const isPhase = (props, phase, component) => {
  if (props.phase === phase) {
    return component;
  } else {
    return <Redirect to="/" />;
  }
};

const Router = (props) => (
  <BrowserRouter>
    <Route path='/' exact component={Login} />
    <Route path='/main' render={() => authentication(props, <Main />)} />
  </BrowserRouter>
);

export default Router;
