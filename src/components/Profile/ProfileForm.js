import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Typeahead} from 'react-bootstrap-typeahead';
import Loader from '../Loader';

import {GENRES} from '../../constants/genres';
import { withFirebase } from '../Firebase';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const INITIAL_STATE = {
  bio: '',
  artists: [],
  genres: [],
  error: null,
  success: false,
  showLoader: true
};

class ProfileForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this.props.firebase.users().on('value', snapshot => {
      const userData = snapshot.val()[this.props.uid];
      this.setState({
        bio: userData["bio"],
        artists: userData["artists"] || [],
        genres: userData["genres"] || [],
        showLoader: false,
      });
    });
  }

  onSubmit = event => {
    event.preventDefault();
    this.setState({ error: null, success: false });
    const { bio, artists, genres } = this.state;

    this.props.firebase
      .user(this.props.uid)
      .update({
        bio,
        artists,
        genres
      }).then(() => {
        this.setState({ success: true });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { bio, artists, genres, error, success } = this.state;

    return (
      <Form onSubmit={this.onSubmit}>
        <Loader visible={this.state.showLoader}/>
        <Form.Group controlId="bio">
          <Form.Label>Bio</Form.Label>
          <Form.Control 
            name="bio"
            value={bio}
            onChange={this.onChange}
            as="textarea" 
            rows="3" />
        </Form.Group>
        <Form.Group controlId="artists">
          <Form.Label>Favorite Artists</Form.Label>
          <Typeahead
            id="artists"
            multiple
            name="artists"
            selected={artists}
            onChange={(selected) =>{
              this.setState({artists: selected});
            }}
            options={["john", "elton", "candy", "man", "ooga", "booga"]}
          />
        </Form.Group>
        <Form.Group controlId="genres">
          <Form.Label>Favorite Genres</Form.Label>
          <Typeahead
            id="genres"
            multiple
            name="genres"
            selected={genres}
            onChange={(selected) =>{
              this.setState({genres: selected});
            }}
            options={GENRES}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save
        </Button>

        {error && <p className="error">{error.message}</p>}
        {success && <p className="success">Profile updated!</p>}
      </Form>
    );
  }
}

export default withFirebase(ProfileForm);