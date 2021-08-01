import React from 'react';
import './style.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Header from './components/Header';
import Home from './components/Home';

import PrivateRoute from './components/routing/PrivateRoute';

import {
  BrowserRouter,
  Router,
  Switch,
  Redirect,
  Route,
  Link
} from 'react-router-dom';

export default function App() {
  return (
    <div className="outer">
      <BrowserRouter>
        <Header />
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
