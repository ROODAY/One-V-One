import React, { Component } from 'react';
import {
  Navbar,
  Nav
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { AuthUserContext } from '../Session';
import * as ROUTES from '../../constants/routes';

import AuthButtons from './AuthButtons';
import NonAuthButtons from './NonAuthButtons';
import SearchForm from './SearchForm';
import './Navigation.css';

class Navigation extends Component {
  render() {
    return (
      <AuthUserContext.Consumer>
        {({authUser, updateAuth}) => 
          <Navbar bg="light" expand="lg" className="app-navbar">
            <LinkContainer to={ROUTES.LANDING}>
              <Navbar.Brand>One V. One</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                {authUser && <LinkContainer to={ROUTES.HOME}>
                   <Nav.Link>Home</Nav.Link>
                </LinkContainer>}
                {false && <SearchForm />}
              </Nav>
              {authUser ? <AuthButtons /> : <NonAuthButtons />}
            </Navbar.Collapse>
          </Navbar>
        }
      </AuthUserContext.Consumer>
    );
  }
}

export default Navigation;
