import React from 'react';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Login from '../containers/Login';
import Rooms from '../containers/Rooms';
import Students from '../containers/Students';
import StudentsBulkAdd from '../containers/StudentsBulkAdd';

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
    <Route path='/rooms' render={() => authentication(props, <Rooms />)} />
    <Route path='/students' exact render={() => authentication(props, <Students />)} />
    <Route path='/students/bulk-add' exact render={() => authentication(props, <StudentsBulkAdd />)} />
  </BrowserRouter>
);

export default Router;
