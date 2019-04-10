import React, { Component } from 'react';
import {
  Card,
  Button
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class BattleCard extends Component {
  render() {
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Rapper A Vs. Rapper B.</Card.Title>
          <Card.Text>
            Throwdown of the century
          </Card.Text>
          <LinkContainer to={"/battle/" + this.props.battleId}>
            <Button variant="primary">View</Button>
          </LinkContainer>
        </Card.Body>
      </Card>
    );
  }
}

export default BattleCard;
