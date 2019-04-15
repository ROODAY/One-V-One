import React, { Component } from 'react';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Nav
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import * as ROUTES from '../../constants/routes';
import Loader from '../Loader'
import { withFirebase } from '../Firebase';

import './Signin.css'

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  showLoader: false,
};

class SigninBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    this.setState({ showLoader: true });
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error, showLoader: false });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <Container>
        <Loader visible={this.state.showLoader} />
        <Row className="justify-content-center">
          <Col md="auto">
            <Form onSubmit={this.onSubmit}>
              <h1>Sign in</h1>

              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  name="email"
                  value={email}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Email Address"/>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                name="password"
                value={password}
                onChange={this.onChange}
                type="password"
                placeholder="Password"/>
                <LinkContainer to={ROUTES.FORGOTPW}>
                  <Nav.Link className="link-sm">Forgot your password?</Nav.Link>
                </LinkContainer>
                  
              </Form.Group>

              <Button variant="primary" type="submit" disabled={isInvalid}>
                Sign in
              </Button>

              {error && <p className="error">{error.message}</p>}
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const Signin = compose(
  withRouter,
  withFirebase,
)(SigninBase);

export default Signin;