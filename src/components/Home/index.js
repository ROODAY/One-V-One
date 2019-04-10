import React, { Component } from 'react';
import {
  Tabs,
  Tab,
  Container,
  Button
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { PostScroller, BattleScroller } from '../Scrollers'
import { withAuthorization } from '../Session';

import * as ROUTES from '../../constants/routes';
import {GENRES} from '../../constants/genres'

import './Home.css'
import micIcon from './micIcon.png';

class Home extends Component {
  render() {
    const GenreTab = (genre, key) => (
      <Tab key={key} eventKey={genre} title={genre}>
        <PostScroller genre={genre}/>
      </Tab>
    )

    return (
      <div>
        <Container className="post-wrapper">
          <img src={micIcon} alt="microphone" height="32px"/>
          <p className="font-weight-bold">Got your mic handy?</p>
          <LinkContainer to={ROUTES.POST}>
             <Button variant="outline-success">Make a Post</Button>
          </LinkContainer>
        </Container>
        <Tabs defaultActiveKey={GENRES[0]}>
          {GENRES.map((genre, i) => {
            return GenreTab(genre, i);
          })}

          {false && <Tab eventKey="battles" title="Battles">
            <BattleScroller />
          </Tab>}
        </Tabs>
      </div>
    );
  }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Home);