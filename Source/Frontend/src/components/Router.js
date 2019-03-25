import React from 'react';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Login from '../containers/Login';
import Rooms from '../containers/Rooms';
import Students from '../containers/Students';
import Campaign from '../containers/Campaign';
import StudentsBulkAdd from '../containers/StudentsBulkAdd';
import Header from '../containers/Header';
import IsAuthenticated from '../containers/IsAuthenticated';

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
    <div>
      <IsAuthenticated>
        <Header />
      </IsAuthenticated>
      <Route path='/' exact component={Login} />
      <Route path='/rooms' render={() => authentication(props, <Rooms />)} />
      <Route path='/students' exact render={() => authentication(props, <Students />)} />
      <Route path='/students/bulk-add' exact render={() => authentication(props, <StudentsBulkAdd />)} />
      <Route path='/campaign' exact render={() => authentication(props, <Campaign />)} />
    </div>
  </BrowserRouter>
);

export default Router;
