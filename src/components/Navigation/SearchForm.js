import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ChangePasswordForm from '../ChangePassword';
import { withRouter } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  search: '',
};

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { search } = this.state;
    this.setState({ ...INITIAL_STATE });
    this.props.history.push(`${ROUTES.SEARCH}?q=${encodeURI(search)}`);
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { search } = this.state;
    const isInvalid = search === '';

    return (
      <Form inline onSubmit={this.onSubmit}>
        <Form.Control 
          name="search"
          value={search}
          onChange={this.onChange}
          type="text" 
          placeholder="Search" 
          className="mr-sm-2" />
        <Button variant="outline-success" type="submit" disabled={isInvalid}>Search</Button>
      </Form>
    );
  }
}

export default withRouter(SearchForm);