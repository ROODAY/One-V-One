import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ChangePasswordForm from '../ChangePassword';
import ProfileForm from './ProfileForm'

import { AuthUserContext, withAuthorization } from '../Session';

class Settings extends Component {
  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
            <Container>
              <Row className="justify-content-md-center">
                <Col md="auto">
                  <h1>Settings</h1>
                  <p>Account: {authUser.email}</p>
                  <ProfileForm />
                  <ChangePasswordForm />
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