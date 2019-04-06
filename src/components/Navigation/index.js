import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { Link, NavLink } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    return (
      <Navbar bg="light" expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand>One V. One</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Nav>
          {!isLoggedIn ? (
            <LinkContainer to="/login" onClick={this.handleLoginClick}>
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          ) : (
            <div className="flex">
              <LinkContainer to="/settings">
                 <Nav.Link>Settings</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/" onClick={this.handleLogoutClick}>
                 <Nav.Link>Logout</Nav.Link>
              </LinkContainer>
            </div>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
