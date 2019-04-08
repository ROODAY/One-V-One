import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Countdown from 'react-countdown-now';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Loader from '../Loader';

import './Post.css'
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';

const timer = 6 * 1000;

const INITIAL_STATE = {
  title: '',
  description: '',
  error: null,
  success: false,
  showForm: false,
  recording: false,
  audioBlob: null,
  transcript: '',
  showLoader: false,
  countdownDate: Date.now() + timer
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

    this.countdown = React.createRef();

    this.startRecording = this.startRecording.bind(this);
  }

  startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      const mediaRecorder = new MediaRecorder(stream);
      const recognition = new window.webkitSpeechRecognition();
      mediaRecorder.start();
      recognition.start();

      
      recognition.onresult = (event) => {
        const speechToText = event.results[0][0].transcript;
        this.setState({transcript: speechToText, showForm: true});
      }

      recognition.onnomatch = (event) => {
        this.setState({transcript: "Could not transcribe", showForm: true});
      }

      this.countdown.current.date = Date.now() + 3000;
      this.countdown.current.getApi().start();
      this.setState({recording: true, success: null})

      const audioChunks = [];

      mediaRecorder.addEventListener("dataavailable", event => {
        audioChunks.push(event.data);
      });

      mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks);
        const audioUrl = URL.createObjectURL(audioBlob);
        this.setState({audioUrl, audioBlob, recording: false});
      });

      setTimeout(() => {
        mediaRecorder.stop();
        recognition.stop();
      }, timer);
    });
  }

  onSubmit = event => {
    event.preventDefault();
    this.setState({showLoader: true});
    const {title, description, transcript} = this.state;
    const username = this.props.firebase.auth.currentUser.displayName;
    const id = uuidv4();

    this.props.firebase.song(id).put(this.state.audioBlob)
    .then(snapshot => {
      return this.props.firebase.song(id).getDownloadURL();
    })
    .then(audioPath => {
      return this.props.firebase.post(id).set({
        username,
        title,
        description,
        audioPath,
        transcript,
        id
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
        <Loader visible={this.state.showLoader} />
        <Row className="justify-content-md-center">
          <Col md="auto">
            <h1>Upload a song</h1>
            <p>Press record and sing until the timer is over! <br/>
            If you're satisfied, upload the clip to our servers for processing, <br/>
            or press Start to record again!</p>
            <Button onClick={this.startRecording}>Start Recording</Button> {this.state.recording && <div id="rec">{null}</div>}<br/>
            <Countdown date={this.state.countdownDate} autoStart={false} ref={this.countdown} renderer={countdownRenderer} />

            {this.state.showForm && 
              
              <Form onSubmit={this.onSubmit}>
                <h3>Your Song</h3>
                <audio src={this.state.audioUrl} controls></audio>
                <p>{this.state.transcript}</p>
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