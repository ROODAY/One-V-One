import React, { Component } from 'react';
import './bootstrap.min.css';
import './App.css';

import { 
  BrowserRouter as Router, 
  Route 
} from 'react-router-dom';
import {
  Navigation,
  Home,
  Battle,
  Search,
  Settings,
  Signup,
  Signin,
  ForgotPassword
} from './components'
import * as ROUTES from './constants/routes';
import { withAuthentication } from './components/Session';

class App extends Component {
  render() {
    return (
      <Router>
        <Navigation />

        <Route exact path={ROUTES.HOME} component={Home} />
        <Route path={ROUTES.BATTLE} component={Battle} />
        <Route path={ROUTES.SETTINGS} component={Settings} />
        <Route path={ROUTES.SEARCH} component={Search} />
        <Route path={ROUTES.SIGNUP} component={Signup} />
        <Route path={ROUTES.SIGNIN} component={Signin} />
        <Route path={ROUTES.FORGOTPW} component={ForgotPassword} />
      </Router>
    );
  }
}

export default withAuthentication(App);