import React, { Component } from 'react';
import Header from './components/common/Header'
import MonthReports from './components/monthReports/MonthReports';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App container-fluid">
        <Header />
        <MonthReports />
      </div>
    );
  }
}

export default App;
