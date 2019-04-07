import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  email: '',
  error: null,
  success: false
};

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    this.setState({ error: null, success: false });
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE, success: true });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error, success } = this.state;
    const isInvalid = email === '';

    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Form onSubmit={this.onSubmit}>
              <h1>Reset Password</h1>

              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  name="email"
                  value={email}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Email Address"/>
              </Form.Group>

              <Button variant="primary" type="submit" disabled={isInvalid}>
                Reset Password
              </Button>

              {error && <p className="error">{error.message}</p>}
              {success && <p className="success">Successfully reset! You show have received an email.</p>}
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withFirebase(ForgotPassword);
