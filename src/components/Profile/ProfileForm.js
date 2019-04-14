import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import axios from 'axios';

import Loader from '../Loader';
import { withFirebase } from '../Firebase';

import 'react-bootstrap-typeahead/css/Typeahead.css';

const INITIAL_STATE = {
  bio: '',
  artists: [],
  artistsLoading: false,
  artistsOptions: [],
  genresLoading: false,
  genresOptions: [],
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
    const { 
      bio, 
      artistsLoading, 
      artistsOptions,
      artists, 
      genresLoading, 
      genresOptions,
      genres, 
      error, 
      success 
    } = this.state;

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
          <AsyncTypeahead
            isLoading={artistsLoading}
            id="artists"
            multiple
            name="artists"
            selected={artists}
            onChange={(selected) =>{
              this.setState({artists: selected});
            }}
            onSearch={query => {
              this.setState({artistsLoading: true});
              axios.get(`/api/getArtists?q=${query}&key=${process.env.REACT_APP_SERVER_KEY}`)
              .then(resp => {
                this.setState({
                  artistsLoading: false,
                  artistsOptions: resp.data.artists.items.map(artist => artist.name),
                });
              })
            }}
            options={artistsOptions}
          />
        </Form.Group>
        <Form.Group controlId="genres">
          <Form.Label>Favorite Genres</Form.Label>
          <AsyncTypeahead
            isLoading={genresLoading}
            id="genres"
            multiple
            name="genres"
            selected={genres}
            onChange={(selected) =>{
              this.setState({genres: selected});
            }}
            onSearch={query => {
              this.setState({genresLoading: true});
              axios.get(`/api/getGenres?key=${process.env.REACT_APP_SERVER_KEY}`)
              .then(resp => {
                this.setState({
                  genresLoading: false,
                  genresOptions: resp.data.genres.map(genre => genre.charAt(0).toUpperCase() + genre.slice(1)),
                });
              })
            }}
            options={genresOptions}
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