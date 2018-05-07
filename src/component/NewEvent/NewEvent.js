import React, { Component } from 'react';
import io from 'socket.io-client';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './NewEvent.css';

import FriendContainer from './NEFriendContainer.js'

class NewEvent extends Component {
   
    render(){
        var friendList = this.props.friends.map((val, i)=> {
          return (
              <div className="friendListContainer" key={i}>
                  <FriendContainer noDelete={true} user_id={val.user_id} username={val.username} name={val.name} email={val.email}/>
              </div>
          )
        })  

        return(
            <div className = "NewEvent">
            <h1>New Event</h1><br/>
            Will you be hosting this event?   
            <select>
                <option value="no">No</option>
                <option value="yes">Yes</option>
            </select>
            <br/><br/>
            <h2>Guest List:</h2>

            <div className="list-container">
                {friendList}
            </div>
            <button>Invite friends</button>
            <br/><br/>
            <Link to={'/active-event'}><button>START</button></Link>
            </div>
        )
    }
}

function mapStateToProps(state){
  return{
      user: state.user,
      friends: state.friends
  }
}

export default connect(mapStateToProps, {})(NewEvent);



