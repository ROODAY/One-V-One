import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Button from 'react-bootstrap/Button';
import BattleScroller from './BattleScroller'
import PostScroller from './PostScroller'
import { LinkContainer } from 'react-router-bootstrap';
import * as ROUTES from '../../constants/routes';

import './Home.css'
import { withAuthorization } from '../Session';


class Home extends Component {
  render() {
    return (
      <Tabs defaultActiveKey="posts" id="uncontrolled-tab-example">
        <Tab eventKey="posts" title="Posts">
          <div>
            <p>Want to upload a song?</p>
            <LinkContainer to={ROUTES.POST}>
               <Button variant="primary">Upload</Button>
            </LinkContainer>
          </div>
            
          <PostScroller />
        </Tab>
        <Tab eventKey="battles" title="Battles">
          <BattleScroller />
        </Tab>
      </Tabs>
    );
  }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Home);