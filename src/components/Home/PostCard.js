import React, { Component } from 'react';
import {
  Card,
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton
} from 'react-bootstrap';
import { withFirebase } from '../Firebase';

// add rank and genre to cards

class PostCard extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.audioplayer = React.createRef();

    this.state = {
      value: this.props.rating,
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
    this.setState({ value });
    this.props.firebase.post(this.props.id).update({
      rating: value
    });
  }

  render() {
    return (
      <Card style={{ width: 'fit-content' }}>
        <Card.Body>
          <Card.Title>{this.props.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{this.props.user}</Card.Subtitle>
          <Card.Text>
            {this.props.description}
          </Card.Text>
          <audio src={this.props.audioURL} controls ref={this.audioplayer}></audio><br/>
          <ButtonToolbar>
            <ToggleButtonGroup 
              value={this.state.value}
              onChange={this.handleChange}
              type="checkbox" 
              name="options">
              <ToggleButton value={1}><span role="img" aria-label="like">👍</span></ToggleButton>
              <ToggleButton value={2}><span role="img" aria-label="dislike">👎</span></ToggleButton>
            </ToggleButtonGroup>

            <span className="listens" role="img" aria-label="listens">🎶: {this.state.listens}</span>
          </ButtonToolbar>
        </Card.Body>
      </Card>
    );
  }
}

export default withFirebase(PostCard);
