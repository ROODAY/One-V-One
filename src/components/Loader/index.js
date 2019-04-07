import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner'

import './Loader.css'

class Loader extends Component {
  render() {
    return (
      <div>
        {this.props.visible &&
          <div className="loader-container">
            <Spinner animation="border" variant="primary" />
          </div>
        }
      </div>
    );
  }
}

export default Loader;


