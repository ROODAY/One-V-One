import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import BattleScroller from './BattleScroller'

import './Home.css'


class Home extends Component {
  render() {
    return (
      <Tabs defaultActiveKey="live" id="uncontrolled-tab-example">
        <Tab eventKey="upcoming" title="Upcoming">
          <BattleScroller />
        </Tab>
        <Tab eventKey="live" title="Live">
          <BattleScroller />
        </Tab>
        <Tab eventKey="archive" title="Archive">
          <BattleScroller />
        </Tab>
      </Tabs>
    );
  }
}

export default Home;
