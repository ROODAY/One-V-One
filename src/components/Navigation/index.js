import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { LinkContainer } from 'react-router-bootstrap';
import { AuthUserContext } from '../Session';
import AuthButtons from './AuthButtons'
import NonAuthButtons from './NonAuthButtons'
import SearchForm from './SearchForm'

import './Navigation.css';
import * as ROUTES from '../../constants/routes';

class Navigation extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <LinkContainer to={ROUTES.HOME}>
          <Navbar.Brand>One V. One</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <SearchForm />
          </Nav>
          <AuthUserContext.Consumer>
            {authUser =>
              authUser ? <AuthButtons /> : <NonAuthButtons />
            }
          </AuthUserContext.Consumer>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
