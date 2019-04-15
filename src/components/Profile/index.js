import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Tabs,
  Tab
} from 'react-bootstrap';

import Settings from '../Settings';
import { AuthUserContext, withAuthorization } from '../Session';
import ProfileForm from './ProfileForm';

class Profile extends Component {
  render() {
    return (
      <AuthUserContext.Consumer>
        {({authUser, updateAuth}) => (
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
              <Tab eventKey="profile" title="Profile">
                <Container className="settings-container">
                  <Row className="justify-content-center">
                    <Col md="auto">
                      <h1>Profile</h1>
                      <ProfileForm uid={authUser.uid}/>
                    </Col>
                  </Row>
                </Container>
              </Tab>
              <Tab eventKey="settings" title="Settings">
                <Settings />
              </Tab>
              {false && <Tab eventKey="notifications" title="Notifications">
                <div>Coming soon</div>
              </Tab>}
            </Tabs>
          )}
      </AuthUserContext.Consumer>
            
    );
  }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Profile);
