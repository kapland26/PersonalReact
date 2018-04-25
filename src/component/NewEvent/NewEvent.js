import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './NewEvent.css';

class NewEvent extends Component {

    render(){
        return(
            <div className = "NewEvent">
                New Event
                <br/><br/>
                Will you be hosting this event?   
                <select>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                </select>
                <br/><br/>
                <h1>Guest List:</h1>
                
                <div className="list-container">
                    Friends list (delete options)
                </div>
                <button>Invite friends</button>
                <br/><br/>
                <Link to={'/active-event'}><button>START</button></Link>

            </div>
        )
    }
}
export default NewEvent;