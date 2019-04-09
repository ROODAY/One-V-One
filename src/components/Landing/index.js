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
  CallToAction, 
  ScrollDownIndicator, 
  Feature, 
  Testimony,
  Contributor
} from 'react-landing-page'

import * as ROUTES from '../../constants/routes';
import './Landing.css';

class Landing extends Component {
  render() {
    return (
      <Provider className="landing-wrapper">
        <Hero
          color="black"
          bg="white"
          backgroundImage="https://source.unsplash.com/jxaj-UrzQbc/1600x900"
        >
            <Heading>Name of your app</Heading>
            <Subhead>a couple more words</Subhead>
            <CallToAction href={ROUTES.SIGNUP} mt={3}>Sign Up!</CallToAction>
            <ScrollDownIndicator/>
        </Hero>
        <Heading className="margin-heading" textAlign="center">Features</Heading>
        <Flex flexWrap="wrap" justifyContent="center">
            <Feature icon="👋" description="What your users see first">
                Hero
            </Feature>
            <Feature icon="🔥" description="What your app can do">
                Features
            </Feature>
            <Feature icon="📩" description="How to keep in touch">
                Sign Up
            </Feature>
        </Flex>
        <Heading className="margin-heading" textAlign="center">What people are saying</Heading>
        <Flex alignItems="flex-end" justifyContent="space-around">

            <Testimony
                className="padded-testimony grow-card"
                authorAvatar="/assets/img/jing.jpg"
                authorName="Herman Starikov"
                authorTitle="developer">
                Use react-landing-page for your landing page needs. Or do not, I am not a beggar...
            </Testimony>

            <Testimony
                className="padded-testimony grow-card"
                authorAvatar="/assets/img/jing.jpg"
                authorName="Herman Starikov"
                authorTitle="developer">
                Use react-landing-page for your landing page needs. Or do not, I am not a beggar...
            </Testimony>

            <Testimony
                className="padded-testimony grow-card"
                authorAvatar="/assets/img/jing.jpg"
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
                avatar="/assets/img/jing.jpg"
                >
                <Flex>
                    <NavLink href='https://github.com/jinghul'>GitHub</NavLink>
                </Flex>
            </Contributor>

            <Contributor
                className="grow-card"
                fullName="Rudhra Raveendran"
                title="developer"
                avatar="/assets/img/rudy.jpg"
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

export default Landing;
