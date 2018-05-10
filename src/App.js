import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import routes from "./routes";
import './reset.css';
import './App.css';
import logo from './peaceHand.jpg'
require('dotenv').config();

const {
  LOGOUT_REDIRECT
} = process.env;

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="header-container">
          <ul>
            <div className="title-container"><img src={logo} alt="Nav logo"/> <h1> <font color="#4EC5C1">N</font>aux<font color="#EC576B">P</font>as </h1></div>
            <div className="list-container">
              <li><Link to={'/home'}>Home</Link></li>
              <li><Link to={'/friends'}>Friends</Link></li>
              <li><Link to={'/new-event'}>Create Event</Link></li>
              <li><Link to={'/settings'}>Settings</Link></li>
              <li><a href={LOGOUT_REDIRECT}> Logout </a></li>
            </div>
          </ul>
        </div>
        {routes}
      </div>
    );
  }
}

export default App;
