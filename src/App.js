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
  Settings,
  Signup,
  Signin,
  Loader
} from './components'
import * as ROUTES from './constants/routes';
import { withFirebase } from './components/Firebase';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      showLoader: true
    };
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
        this.setState({ showLoader: false });
      },
    );
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    return (
      <Router>
        <Navigation authUser={this.state.authUser}/>

        <Loader visible={this.state.showLoader} />

        <Route exact path={ROUTES.HOME} component={Home} />
        <Route path={ROUTES.BATTLE} component={Battle} />
        <Route path={ROUTES.SETTINGS} component={Settings} />
        <Route path={ROUTES.SEARCH} component={Search} />
        <Route path={ROUTES.SIGNUP} component={Signup} />
        <Route path={ROUTES.SIGNIN} component={Signin} />
      </Router>
    );
  }
}

export default withFirebase(App);