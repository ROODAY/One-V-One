import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ChangePasswordForm from '../ChangePassword';
import ProfileForm from './ProfileForm'
import DisplayNameForm from './DisplayNameForm'

import { AuthUserContext, withAuthorization } from '../Session';
import './Settings.css'

class Settings extends Component {
  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
            <Container className="settings-container">
              <Row className="justify-content-md-center">
                <Col md="auto">
                  <h1>Settings</h1>
                  <p>Account: {authUser.email}</p>
                  <DisplayNameForm displayName={authUser.displayName} />
                  <br/>
                  <ProfileForm uid={authUser.uid}/>
                  <br/>
                  <ChangePasswordForm email={authUser.email} />
                </Col>
              </Row>
            </Container>
          )}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Settings);