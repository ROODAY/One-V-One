import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
  success: false,
};

class ChangePasswordForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    this.setState({ error: null, success: false });
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
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
    const { passwordOne, passwordTwo, error, success } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';

    return (
      <Form onSubmit={this.onSubmit}>
        <h1>Change Password</h1>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="New Password"/>
        </Form.Group>

        <Form.Group controlId="passwordConfirm">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm New Password"/>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isInvalid}>
          Change Password
        </Button>

        {error && <p className="error">{error.message}</p>}
        {success && <p className="success">Password changed!</p>}
      </Form>
    );
  }
}

export default withFirebase(ChangePasswordForm);