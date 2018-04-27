import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './ActiveEvent.css'
import logo from './peace-temp.png'

class ActiveEvent extends Component {

    render(){
        return(
            <div className = "ActiveEvent">
                Active Event
                <br/><br/>
                <div className= "guest-list" >
                    Guest List
                </div>
                <br/><br/>
                <Link to={'/home'}><button><img src={logo} alt="temp-log" /></button></Link>
            </div>
        )
    }
}
export default ActiveEvent;