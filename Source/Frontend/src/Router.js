import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Login from './routes/Login';
import Main from './routes/Main';

const Router = () => (
  <BrowserRouter>
    <Route path='/' exact component={Login} />
    <Route path='/main' component={Main} />
  </BrowserRouter>
);

export default Router;