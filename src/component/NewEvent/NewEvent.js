import React, { Component } from 'react';
import io from 'socket.io-client';
// import {Link} from 'react-router-dom';
import './NewEvent.css';

class NewEvent extends Component {
    constructor() {
        super();
        this.state = {
          input: '',
          message: '',
          room: null,
          joined: false
        }
    
        this.updateMessage = this.updateMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        // EVERYONE IN ROOM
        this.joinRoom = this.joinRoom.bind(this);
        this.joinSuccess = this.joinSuccess.bind(this);
      }
      componentDidMount() {
        this.socket = io();
        this.socket.on('message dispatched', data => {
          this.updateMessage(data);
        })
        // EVERYONE IN ROOM
        this.socket.on('room joined', data => {
          this.joinSuccess()
        })
      }
      updateMessage(message) {
        console.log(message)
        this.setState({
          message
        })
      }
    
      
      sendMessage() {
        this.socket.emit('message sent', {
          message: this.state.input,
          room: this.state.room
        })
      }
    
    
      joinRoom() {
        if (this.state.room) {
          this.socket.emit('join room', {
            room: this.state.room
          })
        }
      }
      joinSuccess() {
        this.setState({
          joined: true
        })
      }
    render(){
        return(
            <div className = "NewEvent">
               {this.state.joined ? <h1>My Room: {this.state.room}</h1> : null}
        <h2>{this.state.message}</h2>
        {
          this.state.joined
            ?
            <div>
              <input value={this.state.input} onChange={e => {
                this.setState({
                  input: e.target.value
                })
              }} />
              <button onClick={this.sendMessage}>Send</button>
            </div>
            :
            <div>
              <input value={this.state.room} onChange={e => {
                this.setState({
                  room: e.target.value
                })
              }} />
              <button onClick={this.joinRoom}>Join</button>
            </div>
        }
            </div>
        )
    }
}
export default NewEvent;


// New Event
// <br/><br/>
// Will you be hosting this event?   
// <select>
//     <option value="no">No</option>
//     <option value="yes">Yes</option>
// </select>
// <br/><br/>
// <h1>Guest List:</h1>

// <div className="list-container">
//     Friends list (delete options)
// </div>
// <button>Invite friends</button>
// <br/><br/>
// <Link to={'/active-event'}><button>START</button></Link>
