import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import LoginContainer from './containers/LoginContainer';
import Main from './routes/Main';

const Router = () => (
  <BrowserRouter>
    <Route path='/' exact component={LoginContainer} />
    <Route path='/main' component={Main} />
  </BrowserRouter>
);

export default Router;