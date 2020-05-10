import React, { Component } from 'react';
import GithubFinder from './components/githubFinder/GithubFinder';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <GithubFinder /> />
      </div>
    );
  }
}

export default App;
