import React, { Component } from 'react';
import { withAuthorization } from '../Session';


class Post extends Component {
  render() {
    return (
      <h1>Make a post</h1>
    );
  }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Post);