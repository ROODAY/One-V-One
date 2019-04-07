import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './Battle.css'

class Battle extends Component {
  render() {
    return (
      <Container fluid={true} className="flex-grow-column">
        <Row className="flex-grow-row">
          <Col md={9} className="flex-grow-column">
            <Container className="flex-grow-column">
              <Row className="flex-grow-row bordered">
                Video
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
