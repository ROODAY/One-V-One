import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Loader from '../Loader'
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

import './Signup.css';
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
  showLoader: false,
};

class SignupBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    event.preventDefault();
    this.setState({ showLoader: true });
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        return authUser.user.updateProfile({
          displayName: username
        })
        .then(() => {
          return authUser;
        });
      })
      .then(authUser => {
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
          })
      })
      .then(() => {
        return this.props.firebase.doSignOut()
      })
      .then(() => {
        return this.props.firebase.doSignInWithEmailAndPassword(email, passwordOne)
      })  
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error, showLoader: false });
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <Container>
        <Loader visible={this.state.showLoader} />
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Form onSubmit={this.onSubmit}>
              <h1>Sign up</h1>

              <Form.Group controlId="username">
                <Form.Label>Full Name</Form.Label>
                <Form.Control 
                  name="username"
                  value={username}
                  onChange={this.onChange}
                  type="text"
                  placeholder="John Doe" />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  name="email"
                  value={email}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Email Address"/>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="passwordOne"
                  value={passwordOne}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Password"/>
              </Form.Group>

              <Form.Group controlId="passwordConfirm">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  name="passwordTwo"
                  value={passwordTwo}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Confirm Password"/>
              </Form.Group>

              <Button variant="primary" type="submit" disabled={isInvalid}>
                Sign up
              </Button>

              {error && <p className="error">{error.message}</p>}
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const Signup = compose(
  withRouter,
  withFirebase,
)(SignupBase);

export default Signup;
