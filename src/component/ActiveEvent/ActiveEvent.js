import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux'; 
import io from 'socket.io-client';
import './ActiveEvent.css';
import peace from './peace-temp.png';
import wait from './wait.png';
import {getUser, getFriends, getActiveEvent, leaveEvent, deleteEvent} from './../../ducks/reducer.js';

import Button from 'material-ui/Button';
import { withStyles} from 'material-ui/styles';
import PropTypes from "prop-types"

class ActiveEvent extends Component {

    constructor(){
        super();

        this.state= {
            image : peace,
            over: false,
            /*** Socket State Variables ***/
            input: '',
            messages: []
        }

        this.updateMessage = this.updateMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        // EVERYONE IN ROOM
        this.joinRoom = this.joinRoom.bind(this);
        this.joinSuccess = this.joinSuccess.bind(this);
    }

    componentDidMount(){
        let user = this.props.user || {};
        let newRoom  = user.active_event_id;

        this.socket = io();
        if(newRoom){
            this.joinRoom(newRoom);
        }
        this.socket.on('message dispatched', data => {
          this.updateMessage(data);
        })
        // EVERYONE IN ROOM
        this.socket.on('room joined', data => {
          this.joinSuccess()
        })
    }

    componentWillUnmount(){
        this.socket.emit('leave room', {
            room: this.props.user.active_event_id
        })
    }

    updateMessage(message) {
        if(message ==="%END%"){
            console.log("End message parsed!");
            this.socket.emit('leave room', {
                room: this.props.user.active_event_id
            })
            this.setState({
                over: true
            })
        }else if(message ==="%REFRESH%"){
            console.log("Someone left!");
            this.props.getActiveEvent();
        }
        else{
            console.log("Legit message: ", message)
            let newMsg = this.state.messages;
            newMsg.push(message)
            this.setState({
            messages: newMsg
            })
        }
      }
    
    
    sendMessage() {
        this.socket.emit('message sent', {
            message: this.state.input,
            room: this.props.user.active_event_id
        })
        this.setState({
            imput: ""
        })
    }


    joinRoom(roomIn) {
        console.log("Inside join room, room = ", this.props.user.active_event_id);
        this.socket.emit('join room', {
            room: roomIn
        }) 
    }
    joinSuccess() {
        this.setState({
            joined: true
        })
    }


    updateLeave(){
        const event = this.props.activeEvent||{};
        console.log("ACTIVE EVENT leave: ",event)
            
        if ((event.users_remaining-1)<=Math.floor(event.users_invited/2)){
            this.socket.emit('message sent', {
                message: "%END%",
                room: this.props.user.active_event_id
            })  
            this.props.deleteEvent(event.event_id);
            this.props.setActiveEvent(null);
        }else{
            this.props.leaveEvent(event.event_id, event.users_remaining); 
            this.socket.emit('message sent', {
                message: "%REFRESH%",
                room: this.props.user.active_event_id
            })  
        }
        this.setState({
            image : wait
        })
    }

    render(){
        const {classes} = this.props;
        const user = this.props.user||{};
        const event = this.props.activeEvent||{};
        
        let messageList = this.state.messages.map((val, i,)=>{    
        // let testList = [0,1,2];        
        // let messageList = testList.map((val, i,)=>{
            return (
                <div className="messageContainer" key={i}>
                    <p>{val}</p>
                </div>
            )
        })
        return(
            <div className = "ActiveEvent" >
                { this.state.over === false ? 
                    (
                        <div className="liveEvent">
                            <div className="eventInfoContainer" >
                                <div className="titleContainer">
                                    Active Event
                                </div>
                                <div className= "guest-list" >
                                    <p>User: {user.name} </p>
                                    <p>Event id: {event.event_id}</p>
                                    <p>People left in Room: {event.users_remaining}</p>
                                    <p>People Invited: {event.users_invited}</p>
                                    <p>EOP limit: {Math.floor(event.users_invited/2)}</p>
                                </div>
                            </div>
                            <Button className={classes.imageButton} onClick={()=>this.updateLeave()} disabled={this.state.image===peace? false :true}><img src={this.state.image} alt="temp-log" /></Button>
                            <div className="chatContainer">{messageList}</div>
                            
                            <input value={this.state.input} onChange={e => {
                                this.setState({
                                input: e.target.value
                                })
                            }} /><br/>
                            <Button className={classes.button} onClick={this.sendMessage}>Message</Button><br/>
                        </div>
                    ):
                    <span>LEAVE</span>
                }
                </div>
        )
    }
}

function mapStateToProps(state){
    return{
        user: state.user,
        activeEvent: state.activeEvent,
        eventOver: state.eventOver,
        invites: state.invites
    }
}
const styles = {
    button: {
        color: "white",
        backgroundColor: "#EF5350",
        fontFamily: 'Montserrat',
        margin: "10px"
    },
    imageButton: {
        width: "30px",
        backgroundColor: "#BDBDBD",
        marginBottom: "10px"
    }
}
ActiveEvent.propTypes = {
    classes: PropTypes.object.isRequired
}

ActiveEvent = withStyles(styles, {name: 'ActiveEvent'})(ActiveEvent);
export default connect(mapStateToProps, {getUser, getFriends, getActiveEvent, leaveEvent, deleteEvent})(ActiveEvent);