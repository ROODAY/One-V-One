import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';

class PostCard extends Component {
  render() {
    return (
      <Card style={{ width: 'fit-content' }}>
        <Card.Body>
          <Card.Title>{this.props.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{this.props.user}</Card.Subtitle>
          <Card.Text>
            {this.props.description}
          </Card.Text>
          <audio src={this.props.audioURL} controls></audio><br/>
          <Button variant="primary">Like</Button>
          <Button variant="primary">Dislike</Button>
        </Card.Body>
      </Card>
    );
  }
}

export default PostCard;
