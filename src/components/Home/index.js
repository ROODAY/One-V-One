import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import BattleScroller from './BattleScroller'

import './Home.css'


class Home extends Component {
  render() {
    return (
      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
        <Tab eventKey="home" title="Upcoming">
          <BattleScroller />
        </Tab>
        <Tab eventKey="profile" title="Live">
          <BattleScroller />
        </Tab>
        <Tab eventKey="contact" title="Archive">
          <BattleScroller />
        </Tab>
      </Tabs>
    );
  }
}

export default Home;
