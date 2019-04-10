import React, { Component } from 'react';
import {Nav} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import * as ROUTES from '../../constants/routes';

class NonAuthButtons extends Component {
  render() {
    return (
      <div className="flex">
        <LinkContainer to={ROUTES.SIGNUP}>
          <Nav.Link>Sign up</Nav.Link>
        </LinkContainer>
        <LinkContainer to={ROUTES.SIGNIN}>
          <Nav.Link>Sign in</Nav.Link>
        </LinkContainer>
      </div>
    );
  }
}

export default NonAuthButtons;
