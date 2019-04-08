import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';

class PostCard extends Component {
  render() {
    return (
      <Card style={{ width: 'fit-content' }}>
        <Card.Body>
          <Card.Title>Rapper A's song</Card.Title>
          <Card.Text>
            Listen here sonny
          </Card.Text>
          <audio controls></audio><br/>
            <Button variant="primary">Listen</Button>
            <Button variant="primary">Like</Button>
            <Button variant="primary">Dislike</Button>
        </Card.Body>
      </Card>
    );
  }
}

export default PostCard;
