import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './Battle.css';

class Battle extends Component {
  componentDidMount () {
        const test = document.createElement("script");
        test.src = "/test.js";
        test.async = true;

        document.body.appendChild(test);
        const RTCMultiConnection = window.RTCMultiConnection;
        const conn = new RTCMultiConnection()
        //console.log(conn)
    }
   


  render() {
    return (
      <Container fluid={true} className="flex-grow-column">
        <Row className="flex-grow-row">
          <Col md={9} className="flex-grow-column">
            <Container className="flex-grow-column">
              <Row className="flex-grow-row bordered">
                <section className="make-center">
                  <input type="text" id="broadcast-id" autoCorrect="off" autoCapitalize="off" size="20"/>
                  <button id="open-or-join">Open or Join Broadcast</button>

                  <div className="make-center" id="broadcast-viewers-counter"></div>

                  <video id="video-preview" controls loop></video>
                </section>
                <section className="make-center">
                  <input type="text" id="broadcast-id2" autoCorrect="off" autoCapitalize="off" size="20"/>
                  <button id="open-or-join2">Open or Join Broadcast</button>

                  <div className="make-center" id="broadcast-viewers-counter2"></div>

                  <video id="video-preview2" controls loop></video>
                </section>
              </Row>
              <Row className="bordered">
                <p>
                  Battle ID: {this.props.match.params.battleid} <br/>
                  Rapper A vs. Rapper B <br/>
                  Some other details
                </p>
              </Row>
            </Container>
          </Col>
          <Col md={3} className="bordered">
            Chat bar
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Battle;
