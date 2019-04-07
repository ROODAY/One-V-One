import React, { Component } from 'react';
import queryString from 'query-string';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = { searchTerm: null };
  }

  componentDidMount() {
    let search = queryString.parse(this.props.location.search).q
    this.setState({searchTerm: decodeURI(search)})
  }

  render() {
    const term = this.state.searchTerm;
    return (
      <div>
        <h1>Search</h1>
        {term &&
          <p>You searched for "{term}".</p>
        }
      </div>
  
    );
  }
}

export default Search;
