import React, { Component } from 'react';
import logo from './logo.svg';
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
  Settings
} from './components'
import * as ROUTES from './constants/routes';

class App extends Component {
  render() {
    return (
      <Router>
        <Navigation/>

        <Route exact path={ROUTES.HOME} component={Home} />
        <Route path={ROUTES.BATTLE} component={Battle} />
        <Route path={ROUTES.SETTINGS} component={Settings} />
        <Route path={ROUTES.SEARCH} component={Search} />
      </Router>
    );
  }
}

export default App;
