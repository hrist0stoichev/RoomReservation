import React from 'react';
import { Route, Redirect, HashRouter } from "react-router-dom";
import Login from '../containers/Login';
import Rooms from '../routes/Rooms';
import Students from '../containers/Students';
import Campaign from '../containers/Campaign';
import StudentsBulkAdd from '../containers/StudentsBulkAdd';
import Header from '../containers/Header';
import IsAuthenticated from '../containers/IsAuthenticated';
import RoomsView from '../routes/RoomsView';
import SingleStudent from '../containers/SingleStudent';
import RoomsSingle from '../containers/RoomsSingle';
import Apartments from '../containers/Apartments';
import CreateInvitation from '../containers/CreateInvitation';
import CreateApartment from '../containers/CreateApartment';
import SingleApartment from '../containers/SingleApartment';
import CreateStudent from '../containers/CreateStudent';
import CreateRoom from '../containers/CreateRoom';
import InvitationsAdmin from '../containers/InvitationsAdmin';
import CreateInvitationAdmin from '../containers/CreateInvitationAdmin';
import Dashboard from '../routes/Dashboard';

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
  <HashRouter>
    <div>
      <IsAuthenticated>
        <Header />
      </IsAuthenticated>
      <Route path='/' exact component={Login} />
      <Route path='/dashboard' exact render={() => authentication(props, <Dashboard />)} />
      <Route path='/rooms' exact render={() => authentication(props, <Rooms />)} />
      <Route path='/rooms/single' exact render={() => authentication(props, <RoomsSingle />)} />
      <Route path='/rooms/view' render={() => authentication(props, <RoomsView />)} />
      <Route path='/rooms/create' exact render={() => authentication(props, <CreateRoom />)} />
      <Route path='/students' exact render={() => authentication(props, <Students />)} />
      <Route path='/students/bulk-add' exact render={() => authentication(props, <StudentsBulkAdd />)} />
      <Route path='/students/create' exact render={() => authentication(props, <CreateStudent />)} />
      <Route path='/single-student' exact render={() => authentication(props, <SingleStudent />)} />
      <Route path='/campaign' exact render={() => authentication(props, <Campaign />)} />
      <Route path='/apartments' exact render={() => authentication(props, <Apartments />)} />
      <Route path='/invitations/create' exact render={() => authentication(props, <CreateInvitation />)} />
      <Route path='/invitations/admin/create' exact render={() => authentication(props, <CreateInvitationAdmin />)} />
      <Route path='/apartments/create' exact render={() => authentication(props, <CreateApartment />)} />
      <Route path='/apartments/details' exact render={() => authentication(props, <SingleApartment />)} />
      <Route path='/invitations/' exact render={() => authentication(props, <InvitationsAdmin />)} />
    </div>
  </HashRouter>
);

export default Router;
