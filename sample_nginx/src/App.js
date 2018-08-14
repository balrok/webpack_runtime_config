import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          vars: {process.env.REACT_APP_VAR1}; {process.env.REACT_APP_VAR2}<br/>
        </p>
      </div>
    );
  }
}

export default App;
