import React, { Component } from 'react';
import './reset.css';
import './App.css';
import {Link} from 'react-router-dom';


import routes from "./routes";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="header-container">
          <ul>
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/friends'}>Friends</Link></li>
            <li><Link to={'/new-event'}>Start Event</Link></li>
            <li><Link to={'/user-info'}>Settings</Link></li>
          </ul>
        </div>
        {routes}
      </div>
    );
  }
}

export default App;
