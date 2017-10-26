import React, { Component } from 'react';
import './App.css';
import PageHeader from './components/PageHeader.js';
import Main from './components/Main.js';

class App extends Component {
  render() {
    return (
        <div>
            <div>
                <PageHeader/>
            </div>
            <div className="mainContent">
                <Main/>
            </div>
        </div>
    );
  }
}

export default App;
