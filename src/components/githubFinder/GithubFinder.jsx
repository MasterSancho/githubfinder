import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import Users from './users/Users';
import User from './users/User';
import Search from './users/Search';
import Alert from './layout/Alert';
import About from '../pages/About';
import axios from 'axios';
import './githubFinder.css';

const GithubFinder = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    showUsers();
  }, []);

   const  showUsers = async () => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUsers(res.data);
    setLoading(false);
  };

  // Search Github Users
  const searchUsers = async text => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUsers(res.data.items);
    setLoading(false);
  };

  // get single github user
  const getUser = async username => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUser(res.data);
    setLoading(false);
  };

  // get users repos
  const getUserRepos = async username => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setRepos(res.data);
    setLoading(false);
  };

  // clear users from state
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  // set Alert
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <div>
      <Alert alert={alert} />
      <Switch>
        <Route
          exact
          path='/'
          render={props => (
            <Fragment>
              <Search
                searchUsers={searchUsers}
                clearUsers={clearUsers}
                showClear={users.length > 0 ? true : false}
                setAlert={showAlert}
              />
              <Users loading={loading} users={users} />
            </Fragment>
          )}
        />
        <Route exact path='/about' component={About} />
        <Route
          exact
          path='/user/:login'
          render={props => (
            <User
              {...props}
              getUser={getUser}
              getUserRepos={getUserRepos}
              user={user}
              repos={repos}
              loading={loading}
            />
          )}
        />
      </Switch>
    </div>
  );
};

export default GithubFinder;
