import React, { Component } from 'react';
import { 
  Provider, 
  Heading, 
  Subhead, 
  Flex,
  NavLink,
  Small
} from 'rebass'
import {
  Hero, 
  ScrollDownIndicator, 
  Feature, 
  Testimony,
  Contributor
} from 'react-landing-page'
import { withRouter } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import * as ROUTES from '../../constants/routes';

import './Landing.css';
import jingPhoto from './jing.jpg';
import rudyPhoto from './rudy.jpg';
import eminemPhoto from './eminem.jpg';
import billyPhoto from './billy.png';
import arianaPhoto from './ariana.jpg';
import background from './landingBackground.jpg'

class Landing extends Component {
  static contextType = AuthUserContext;

  componentDidUpdate() {
    if (this.context.authUser) {
      this.props.history.push(ROUTES.HOME);
    }
  }

  render() {
    return (
      <Provider className="landing-wrapper">
        <Hero
          color="white"
          backgroundImage={background}
        >
            <Heading>SoundBooth</Heading>
            <Subhead>the indie vocalist social network</Subhead>
            <ScrollDownIndicator/>
        </Hero>
        <Heading className="margin-heading" textAlign="center">Join the Revolution!</Heading>
        <Flex flexWrap="wrap" justifyContent="center">
            <Feature icon="🎤" description="Sing your heart out, all you need is a microphone">
                Record
            </Feature>
            <Feature icon="🔥" description="Catch on fire and grow your fanbase">
                Share
            </Feature>
            <Feature icon="👥" description="Connect with other artists and find new music">
                Network
            </Feature>
        </Flex>
        <Heading className="margin-heading d-none d-sm-block" textAlign="center">What people are saying</Heading>
        <Flex alignItems="flex-end" justifyContent="space-around" className="d-none d-sm-flex">

            <Testimony
                className="padded-testimony grow-card"
                authorAvatar={eminemPhoto}
                authorName="Marshall Mathers"
                authorTitle="rapper">
                The quality of the lyrics found on this site is inspiring.
            </Testimony>

            <Testimony
                className="padded-testimony grow-card"
                authorAvatar={arianaPhoto}
                authorName="Ariana Grande"
                authorTitle="pop idol">
                I wouldn't be where I am today without SoundBooth!
            </Testimony>

            <Testimony
                className="padded-testimony grow-card"
                authorAvatar={billyPhoto}
                authorName="Billy Ray Cyrus"
                authorTitle="cowboy">
                Yeehaw! I love SoundBooth!
            </Testimony>

        </Flex>
        <Heading className="margin-heading" textAlign="center">Made by</Heading>
        <Flex justifyContent="center">
            <Contributor
                className="grow-card"
                fullName="Jinghu Lei"
                title="developer"
                avatar={jingPhoto}
                >
                <Flex>
                    <NavLink href='https://github.com/jinghul'>GitHub</NavLink>
                </Flex>
            </Contributor>

            <Contributor
                className="grow-card"
                fullName="Rudhra Raveendran"
                title="developer"
                avatar={rudyPhoto}
                >
                <Flex>
                    <NavLink href='https://github.com/ROODAY'>GitHub</NavLink>
                </Flex>
            </Contributor>
        </Flex>
        <Flex is="footer" alignItems="center" p={3}>
            <NavLink children="Source Code" href="https://github.com/ROODAY/SoundBooth"/>
            <NavLink children="Writeup" href="/Writeup.pdf"/>
            <Small color="grey" ml="auto">© NUS Ventures, 2019</Small>
        </Flex>
      </Provider>
    );
  }
}

export default withRouter(Landing);