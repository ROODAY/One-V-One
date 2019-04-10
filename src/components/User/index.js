import React, { Component } from 'react';
import {
  Form,
  Container,
  Row,
  Col
} from 'react-bootstrap';
import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import Loader from '../Loader';
import { withFirebase } from '../Firebase';

import {GENRES} from '../../constants/genres';

const INITIAL_STATE = {
  username: '',
  bio: '',
  artists: [],
  genres: [],
  error: null,
  showLoader: true
};

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE
    }
  }

  componentDidMount() {
    this.props.firebase.user(this.props.match.params.userid).on('value', snapshot => {
      if (snapshot.val() === null) {
        console.log("no user")
        this.setState({ error: true, showLoader: false });
      } else {
        const {username, bio, artists, genres} = snapshot.val();
        this.setState({
          username,
          bio,
          artists,
          genres,
          showLoader: false,
        });
      }
    });
  }

  render() {
    const {username, bio, artists, genres, error} = this.state;

    return (
      <Container className="settings-container">
        <Row className="justify-content-center">
          <Col md="auto">
            <h1>{!error ? username : "User not found!"}</h1>
            {!error && <Form>
              <Loader visible={this.state.showLoader}/>
              <Form.Group controlId="bio">
                <Form.Label>Bio</Form.Label>
                <Form.Control 
                  name="bio"
                  value={bio}
                  as="textarea" 
                  disabled={true}
                  rows="3" />
              </Form.Group>
              <Form.Group controlId="artists">
                <Form.Label>Favorite Artists</Form.Label>
                <Typeahead
                  id="artists"
                  multiple
                  name="artists"
                  disabled={true}
                  selected={artists}
                  onChange={()=>{}}
                  options={["john", "elton", "candy", "man", "ooga", "booga"]}
                />
              </Form.Group>
              <Form.Group controlId="genres">
                <Form.Label>Favorite Genres</Form.Label>
                <Typeahead
                  id="genres"
                  multiple
                  name="genres"
                  disabled={true}
                  selected={genres}
                  onChange={()=>{}}
                  options={GENRES}
                />
              </Form.Group>
            </Form>}
          </Col>
        </Row>
      </Container>
            
    );
  }
}

export default withFirebase(User);
