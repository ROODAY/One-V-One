import React, { Component } from 'react';
import {
  Container,
  Row,
  Col
} from 'react-bootstrap';

import { AuthUserContext } from '../Session';
import ChangePasswordForm from '../ChangePassword';

import DisplayNameForm from './DisplayNameForm'
import './Settings.css'

class Settings extends Component {
  render() {
    return (
      <AuthUserContext.Consumer>
        {({authUser, updateAuth}) =>
          <Container className="settings-container">
            <Row className="justify-content-center">
              <Col md="auto">
                <h1>Settings</h1>
                <p>Account: {authUser.email}</p>
                <DisplayNameForm displayName={authUser.displayName} />
                <br/>
                <ChangePasswordForm email={authUser.email} />
              </Col>
            </Row>
          </Container>
        }
      </AuthUserContext.Consumer>
    );
  }
}

export default Settings;