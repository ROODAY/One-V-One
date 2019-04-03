import React, { Component } from 'react';
import logo from './logo.svg';
import './bootstrap.min.css';
import './App.css';

import AppNavbar from './components/AppNavbar'
import AppContent from './components/AppContent'

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNavbar/>
        <AppContent/>
      </div>
    );
  }
}

export default App;
