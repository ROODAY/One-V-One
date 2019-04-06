import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

class Home extends Component {
  render() {
    return (
      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
        <Tab eventKey="home" title="Upcoming">
          Upcoming Battles
        </Tab>
        <Tab eventKey="profile" title="Live">
          Live Battles
        </Tab>
        <Tab eventKey="contact" title="Archive">
          Past Battles
        </Tab>
      </Tabs>
    );
  }
}

export default Home;
