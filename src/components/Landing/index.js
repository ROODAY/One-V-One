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
            <Heading>Name of your app</Heading>
            <Subhead>a couple more words</Subhead>
            <ScrollDownIndicator/>
        </Hero>
        <Heading className="margin-heading" textAlign="center">Features</Heading>
        <Flex flexWrap="wrap" justifyContent="center">
            <Feature icon="🎤" description="What your users see first">
                Hero
            </Feature>
            <Feature icon="🔥" description="What your app can do">
                Features
            </Feature>
            <Feature icon="👥" description="How to keep in touch">
                Sign Up
            </Feature>
        </Flex>
        <Heading className="margin-heading d-none d-sm-block" textAlign="center">What people are saying</Heading>
        <Flex alignItems="flex-end" justifyContent="space-around" className="d-none d-sm-flex">

            <Testimony
                className="padded-testimony grow-card"
                authorAvatar={jingPhoto}
                authorName="Herman Starikov"
                authorTitle="developer">
                Use react-landing-page for your landing page needs. Or do not, I am not a beggar...
            </Testimony>

            <Testimony
                className="padded-testimony grow-card"
                authorAvatar={jingPhoto}
                authorName="Herman Starikov"
                authorTitle="developer">
                Use react-landing-page for your landing page needs. Or do not, I am not a beggar...
            </Testimony>

            <Testimony
                className="padded-testimony grow-card"
                authorAvatar={jingPhoto}
                authorName="Herman Starikov"
                authorTitle="developer">
                Use react-landing-page for your landing page needs. Or do not, I am not a beggar...
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
            <NavLink children="Source Code" href="#"/>
            <NavLink children="Writeup" href="#"/>
            <Small color="grey" ml="auto">© NUS Ventures, 2019</Small>
        </Flex>
      </Provider>
    );
  }
}

export default withRouter(Landing);