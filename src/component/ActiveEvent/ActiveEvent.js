import React, { Component } from 'react';
import {connect} from 'react-redux'; 
import io from 'socket.io-client';
import './ActiveEvent.css';
import peace from './peace-temp.png';
import wait from './wait.png';
import {getUser, getFriends, getActiveEvent, resetActiveEvent, makeRedirFalse, leaveEvent, deleteEvent} from './../../ducks/reducer.js';

import Button from 'material-ui/Button';
import { withStyles} from 'material-ui/styles';
import PropTypes from "prop-types"
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';

class ActiveEvent extends Component {

    constructor(){
        super();

        this.state= {
            image : peace,
            over: false,
            timer: 0,
            /*** Socket State Variables ***/
            input: '',
            messages: [],
            leaver:false
        }

        this.updateMessage = this.updateMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        // EVERYONE IN ROOM
        this.joinRoom = this.joinRoom.bind(this);
        this.joinSuccess = this.joinSuccess.bind(this);
    }

    componentDidMount(){
        if(!this.props.user){
            // this.props.history.push('/');
        }
        window.scrollTo(0,0);

        let user = this.props.user || {};

        let newRoom  = user.active_event_id;

        this.props.makeRedirFalse();
        
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
        let user = this.props.user || {};
        this.socket.emit('leave room', {
            room: user.active_event_id
        })
    }

    updateMessage(message) {
        if(this.state.leaver===false){
            if(message ==="%END%"){
                console.log("End message parsed!");
                this.socket.emit('leave room', {
                    room: this.props.activeEvent.event_id
                })
                this.setState({
                    over: true
                })
            }else if(message ==="%REFRESH%"){
                console.log("Someone left!");
                this.props.getActiveEvent(this.props.activeEvent.event_id);
            }
            else{
                console.log("Legit message: ", message)
                let newMsg = this.state.messages;
                newMsg.push(message)
                this.setState({
                messages: newMsg
                })
            }
        }else{
            this.setState({
                leaver: false
            })
        }   
      }
    
    
    sendMessage() {
        this.socket.emit('message sent', {
            message: this.state.input,
            room: this.props.activeEvent.event_id
        })
        this.setState({
            input: ""
        })
    }


    joinRoom() {
        console.log("Inside join room, room = ", this.props.activeEvent);
        
        this.socket.emit('join room', {
            room: this.props.activeEvent.event_id
        }) 
    }
    joinSuccess() {
        this.setState({
            joined: true
        })
    }
    handleSetTimer(e){
        console.log("Inside handle timer!: ", e)
        this.setState({
            timer: e
        })
    }
    updateLeave(){
        const event = this.props.activeEvent||{};
        const user = this.props.user||{};

        this.props.makeRedirFalse();
        console.log("ACTIVE EVENT leave: ",event)

        console.log("users remaining: ", (event.users_remaining-1), ", EUA: ", event.end_user_amount)
        console.log("event host: ", event.host, ", current_user: ", user.user_id)
        if ((event.users_remaining-1)===event.end_user_amount || event.host===user.user_id.toString()){
            setTimeout(function(){
                console.log("Inside %END% case!");
                this.setState({
                    leaver:true,
                    over: true
                })
                this.socket.emit('message sent', {
                    message: "%END%",
                    room: this.props.activeEvent.event_id
                })                  
                this.props.deleteEvent(event.event_id);
                this.props.resetActiveEvent();
            }, this.state.timer*1000)
        }else{
            console.log("Inside %REFRESH% case, event_id: ", event.event_id,  " , users_remaining: ", event.users_remaining)
            this.props.leaveEvent(event.event_id, event.users_remaining); 
            this.socket.emit('message sent', {
                message: "%REFRESH%",
                room: this.props.activeEvent.event_id
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
                 /* {this.state.over ===true? */
                    (
                        <div className="liveEvent">
                            <div className="eventInfoContainer" >
                                <div className="titleContainer">
                                    Active Event
                                </div>
                                <div className= "guest-list" >
                                    <p>Event: {event.name} </p>
                                    <p>User: {user.name} </p>
                                    <p>Event id: {event.event_id}</p>
                                    <p>People left in Room: {event.users_remaining}</p>
                                    <p>People Invited: {event.users_invited}</p>
                                    <p>EOP limit: {event.end_user_amount}</p>
                                    <div classnmae="timerContainer">
                                        Timer to Leave: 
                                        <FormControl className={classes.formControl}>
                                        <Select
                                            value={this.state.timer}
                                            onChange={(e)=>this.handleSetTimer(e.target.value)}
                                            className={classes.select}>
                                            <MenuItem value={0}>
                                            <em>No Delay</em>
                                            </MenuItem>
                                            <MenuItem value={10}>10 seconds</MenuItem>
                                            <MenuItem value={30}>30 seconds</MenuItem>
                                            <MenuItem value={60}>1 minute</MenuItem>
                                            <MenuItem value={300}>5 minutes</MenuItem>
                                        </Select>
                                        </FormControl>
                                    </div>
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
                    <div className="leave">
                            BYE
                    </div>
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
    },
    select: {
        margin: "0px",
        color: "#4DB6AC"
    }
}
ActiveEvent.propTypes = {
    classes: PropTypes.object.isRequired
}

ActiveEvent = withStyles(styles, {name: 'ActiveEvent'})(ActiveEvent);
export default connect(mapStateToProps, {getUser, getFriends, getActiveEvent, resetActiveEvent, makeRedirFalse, leaveEvent, deleteEvent})(ActiveEvent);