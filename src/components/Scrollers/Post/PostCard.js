import React, { Component } from 'react';
import {
  Card,
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton,
  Row,
  Col
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { withFirebase } from '../../Firebase';

class PostCard extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.audioplayer = React.createRef();

    this.state = {
      value: this.props.userRating,
      listens: this.props.listens || 0
    };
  }

  componentDidMount() {
    this.audioplayer.current.onplaying = event => {
      const listens = this.state.listens + 1;
      this.setState({listens});
      this.props.firebase.post(this.props.id).update({
        listens
      });
    }
  }

  handleChange(value, event) {
    if (value.length > 1) {
      value = value[1]
    } else if (value.length > 0) {
      value = value[0]
    } else {
      value = 0
    }

    const oldValue = this.state.value;
    this.setState({ value });

    this.props.firebase
    .userPostScore(this.props.currentUserId, this.props.id)
    .update({value})
    .then(() => {
      this.props.firebase.postRating(this.props.id)
      .transaction((currentRating) => {
        return (currentRating || 0) - oldValue + value;
      });
    });
  }

  render() {
    return (
      <Card style={{ width: 'fit-content' }}>
        <Card.Body>
          <Row>
            <Col>
              <Card.Title>{this.props.title}</Card.Title>
              <LinkContainer to={`user/${this.props.userId}`}>
                <Card.Subtitle className="mb-2 text-muted userlink">{this.props.user}</Card.Subtitle>
              </LinkContainer>
            </Col>
            <Col style={{textAlign: "right"}}>
              <Card.Subtitle className="mb-2">{this.props.genre}</Card.Subtitle>
              <Card.Subtitle className="mb-2">{this.props.rank} <span role="img" aria-label="hotness">🔥</span></Card.Subtitle>
            </Col>
          </Row>
          <Card.Text>
            {this.props.description}
          </Card.Text>
          <Card.Text className="font-italic">
            {this.props.timestamp.toLocaleDateString()} {this.props.timestamp.toLocaleTimeString()}
          </Card.Text>
          <audio src={this.props.audioURL} controls ref={this.audioplayer}></audio><br/>
          <ButtonToolbar>
            <ToggleButtonGroup 
              value={this.state.value}
              onChange={this.handleChange}
              type="checkbox" 
              name="options">
              <ToggleButton value={1}><span role="img" aria-label="like">👍</span></ToggleButton>
              <ToggleButton value={-1}><span role="img" aria-label="dislike">👎</span></ToggleButton>
            </ToggleButtonGroup>

            <div className="listens">
              <span role="img" aria-label="listens">🎶: {this.state.listens}</span> 
              <span role="img" aria-label="rating">💜: {this.props.rating}</span>
            </div>
          </ButtonToolbar>
        </Card.Body>
      </Card>
    );
  }
}

export default withFirebase(PostCard);
