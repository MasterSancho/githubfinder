import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GithubFinder from './components/githubFinder/GithubFinder';
import Navbar from './components/homePage/layout/Navbar';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <GithubFinder />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
