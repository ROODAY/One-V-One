import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { Link, NavLink } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { FirebaseContext } from '../Firebase';
import { withFirebase } from '../Firebase';

import './Navigation.css';
import * as ROUTES from '../../constants/routes';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.handleSignout = this.handleSignout.bind(this);
  }

  handleSignout() {
    this.props.firebase
      .doSignOut()
      .then(() => {
        alert("sign out")
        this.forceUpdate();
      });
  }

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <LinkContainer to={ROUTES.HOME}>
          <Navbar.Brand>One V. One</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <LinkContainer to="/search">
                <Button variant="outline-success">Search</Button>
              </LinkContainer>
            </Form>
          </Nav>
          {!this.props.authUser ? (
            <div className="flex">
              <LinkContainer to={ROUTES.SIGNUP}>
                <Nav.Link>Sign up</Nav.Link>
              </LinkContainer>
              <LinkContainer to={ROUTES.SIGNIN}>
                <Nav.Link>Sign in</Nav.Link>
              </LinkContainer>
            </div>
              
          ) : (
            <div className="flex">
              <div className="v-align">Hi, {this.props.authUser.displayName}</div>
              <LinkContainer to={ROUTES.SETTINGS}>
                 <Nav.Link>Settings</Nav.Link>
              </LinkContainer>
              <Nav.Link onClick={this.props.firebase.doSignOut}>Sign out</Nav.Link>
            </div>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withFirebase(Navigation);
