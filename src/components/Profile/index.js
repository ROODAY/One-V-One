import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Settings from '../Settings';
import ProfileForm from './ProfileForm';

import { AuthUserContext, withAuthorization } from '../Session';

class Profile extends Component {
  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
              <Tab eventKey="profile" title="Profile">
                <Container className="settings-container">
                  <Row className="justify-content-md-center">
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
