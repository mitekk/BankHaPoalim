import React, { Component } from 'react';
import WorkingHours from './components/WorkingHours';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App container-fluid">
        <WorkingHours />
      </div>
    );
  }
}

export default App;
