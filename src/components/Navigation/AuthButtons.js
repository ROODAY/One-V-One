import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from 'react-router-bootstrap';
import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

class AuthButtons extends Component {
  render() {
    return (
      <AuthUserContext.Consumer>
        {({authUser, updateAuth}) =>
          <div className="flex">
            <div className="v-align">Hi, {authUser.displayName}</div>
            <LinkContainer to={ROUTES.PROFILE}>
               <Nav.Link>Profile</Nav.Link>
            </LinkContainer>
            <LinkContainer to={ROUTES.HOME}>
              <Nav.Link onClick={this.props.firebase.doSignOut}>Sign out</Nav.Link>
            </LinkContainer>
          </div>
        }
      </AuthUserContext.Consumer>
          
    );
  }
}

export default withFirebase(AuthButtons);