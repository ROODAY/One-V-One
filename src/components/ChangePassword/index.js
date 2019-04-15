import React, { Component } from 'react';
import {
  Form,
  Button
} from 'react-bootstrap';

import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  passwordOld: '',
  error: null,
  success: false,
};

class ChangePasswordForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    event.preventDefault();
    this.setState({ error: null, success: false });
    const { passwordOld, passwordOne } = this.state;

    var cred = this.props.firebase.EmailAuthProvider.credential(
        this.props.email,
        passwordOld
    );

    this.props.firebase.auth.currentUser.reauthenticateAndRetrieveDataWithCredential(cred)
      .then(() => {
        return this.props.firebase.doPasswordUpdate(passwordOne)
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE, success: true });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { passwordOld, passwordOne, passwordTwo, error, success } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '' || passwordOld === '';

    return (
      <Form onSubmit={this.onSubmit}>
        <h3>Change Password</h3>

        <Form.Group controlId="passwordCurrent">
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            name="passwordOld"
            value={passwordOld}
            onChange={this.onChange}
            type="password"
            placeholder="Current Password"/>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="New Password"/>
        </Form.Group>

        <Form.Group controlId="passwordConfirm">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm New Password"/>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isInvalid}>
          Save
        </Button>

        {error && <p className="error">{error.message}</p>}
        {success && <p className="success">Password changed!</p>}
      </Form>
    );
  }
}

export default withFirebase(ChangePasswordForm);