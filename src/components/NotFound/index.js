import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from 'react-router-bootstrap';
import * as ROUTES from '../../constants/routes';

import './NotFound.css'

class NotFound extends Component {
  render() {
    return (
      <div className="notfound-container">
        <h1>404</h1>
        <p>The page you are looking for does not exist. :(</p>
        <LinkContainer to={ROUTES.HOME} className="notfound-link">
           <Nav.Link>Go Home</Nav.Link>
        </LinkContainer>
      </div>
    );
  }
}

export default NotFound;
