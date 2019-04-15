import React, { Component } from 'react';
import {
  Form,
  Button
} from 'react-bootstrap';

import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  error: null,
  success: false,
};

class DisplayNameForm extends Component {
  constructor(props) {
    super(props);

    const displayName = this.props.displayName;
    this.state = { ...INITIAL_STATE, displayName };
  }

  onSubmit = event => {
    event.preventDefault();
    this.setState({ error: null, success: false });
    const { displayName } = this.state;
    const currentUser = this.props.firebase.auth.currentUser;
    
    currentUser.updateProfile({
      displayName: displayName
    })
    .then(() => {
      return this.props.firebase
        .user(currentUser.uid)
        .update({
          username: displayName
        });
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
    const { displayName, error, success } = this.state;
    const isInvalid = displayName === '';

    return (
      <Form onSubmit={this.onSubmit}>
        <h3>Username</h3>
        <Form.Group controlId="displayName">
          <Form.Control 
            name="displayName"
            value={displayName}
            onChange={this.onChange}
            type="text"/>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isInvalid}>
          Save
        </Button>

        {error && <p className="error">{error.message}</p>}
        {success && <p className="success">Username Updated! (Refresh for update)</p>}
      </Form>
    );
  }
}

export default withFirebase(DisplayNameForm);