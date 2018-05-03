import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import routes from "./routes";
import './reset.css';
import './App.css';
require('dotenv').config();


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="header-container">
          <ul>
            <li><Link to={'/home'}>Home</Link></li>
            <li><Link to={'/friends'}>Friends</Link></li>
            <li><Link to={'/new-event'}>Event</Link></li>
            <li><Link to={'/settings'}>Settings</Link></li>
            <li><a href={'http://localhost:3005/logout'}> Logout </a></li>
          </ul>
        </div>
        {routes}
      </div>
    );
  }
}

export default App;
