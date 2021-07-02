import React from 'react';
import './style.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Header from './components/Header';

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
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
