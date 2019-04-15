import React, { Component } from 'react';
import {
  Button,
  Form,
  Container,
  Row,
  Col
} from 'react-bootstrap';
import axios from 'axios';

import Loader from '../Loader';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';

import './Post.css'

const timer = 5 * 1000;

const INITIAL_STATE = {
  title: '',
  description: '',
  error: null,
  success: false,
  showForm: false,
  recording: false,
  audioBlob: null,
  showLoader: false,
  seconds: timer / 1000,
  loadingMessage: null
};

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    // eslint-disable-next-line
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
      audioUrl: null
    }

    this.startRecording = this.startRecording.bind(this);
  }

  startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();

      this.setState({recording: true, success: null, seconds: timer / 1000})

      const audioChunks = [];

      mediaRecorder.addEventListener("dataavailable", event => {
        audioChunks.push(event.data);
      });

      mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks);
        const audioUrl = URL.createObjectURL(audioBlob);
        this.setState({audioUrl, audioBlob, recording: false, showForm: true});
      });

      const countdown = setInterval(() => {
        const seconds = this.state.seconds - 1;
        this.setState({seconds});
      }, 1000);

      setTimeout(() => {
        mediaRecorder.stop();
        clearInterval(countdown);
      }, timer);
    });
  }

  onSubmit = event => {
    event.preventDefault();
    this.setState({showLoader: true});
    const {title, description} = this.state;
    const username = this.props.firebase.auth.currentUser.displayName;
    const userId = this.props.firebase.auth.currentUser.uid;
    const id = uuidv4();

    this.setState({loadingMessage: "Uploading audio..."});
    this.props.firebase.song(id).put(this.state.audioBlob)
    .then(snapshot => {
      return this.props.firebase.song(id).getDownloadURL();
    })
    .then(audioPath => {
      this.setState({loadingMessage: "Running our algorithm..."});
      return axios.post(`/api/predict?key=${process.env.REACT_APP_SERVER_KEY}`, { audioPath })
      .then(res => {
        return {
          audioPath,
          transcripts: res.data.transcripts,
          hotness: res.data.prediction.hotness,
          genre: res.data.prediction.genre
         };
      });
    })
    .then(data => {
      this.setState({loadingMessage: "Saving metadata..."});
      const {audioPath, transcripts, hotness, genre} = data;
      const timestamp = (new Date()).toISOString();
      return this.props.firebase.post(id).set({
        username,
        userId,
        title,
        description,
        audioPath,
        transcripts,
        id,
        timestamp,
        hotness,
        genre
      });
    })
    .then(() => {
      this.setState({ ...INITIAL_STATE, success: true, showLoader: false });
    })
    .catch(error => {
      this.setState({ error, showLoader: false });
    });
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { title, description, error, success } = this.state;
    const isInvalid = title === '' || description === '';

    const countdownRenderer = ({ seconds }) => {
      if (seconds === 1) {
        return <h3>Time Left: {seconds} second</h3>;
      } else {
        return <h3>Time Left: {seconds} seconds</h3>;
      }
    };

    return (
      <Container className="settings-container">
        <Loader visible={this.state.showLoader} message={this.state.loadingMessage}/>
        <Row className="justify-content-center">
          <Col md="auto">
            <h1>Upload a song</h1>
            <p>Press record and sing until the timer is over! <br/>
            If you're satisfied, upload the clip to our servers for processing, <br/>
            or press Start to record again!</p>
            <Button onClick={this.startRecording}>Start Recording</Button> {this.state.recording && <div id="rec">{null}</div>}<br/>
            {countdownRenderer({seconds: this.state.seconds})}

            {this.state.showForm && 
              <Form onSubmit={this.onSubmit}>
                <h3>Your Song</h3>
                <audio src={this.state.audioUrl} controls></audio>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control 
                    name="title"
                    value={title}
                    onChange={this.onChange}
                    type="text"/>
                </Form.Group>

                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control 
                    name="description"
                    value={description}
                    onChange={this.onChange}
                    as="textarea" 
                    rows="3" />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isInvalid}>
                  Upload
                </Button>
              </Form>
            }

            {error && <p className="error">{error.message}</p>}
            {success && <p className="success">Song Uploaded!</p>}
          </Col>
        </Row>
      </Container>
    );
  }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(withFirebase(Post));