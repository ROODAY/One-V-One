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
            {this.props.message && <p className="font-weight-bold font-italic">{this.props.message}</p>}
          </div>
        }
      </div>
    );
  }
}

export default Loader;


