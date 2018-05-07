import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux'; 
// import io from 'socket.io-client';
import './ActiveEvent.css';
import peace from './peace-temp.png';
import wait from './wait.png';
import {getUser, getFriends, getEventInvites} from './../../ducks/reducer.js';

class ActiveEvent extends Component {

    constructor(){
        super();

        this.state= {
            event : {},
            image : peace,
            over: false,

/************************Socket Code **************** */
        //     input: '',
        //     messages: [],
        }


        // this.updateMessage = this.updateMessage.bind(this);
        // this.sendMessage = this.sendMessage.bind(this);
        // // EVERYONE IN ROOM
        // this.joinRoom = this.joinRoom.bind(this);
        // this.joinSuccess = this.joinSuccess.bind(this);
    }

    //componentDidMount(){
        
        // let user = this.props.user||{};
        // let newRoom  = user.active_event_id;

        // this.socket = io();
        // if(newRoom){
        //     this.joinRoom(newRoom);
        // }
        // this.socket.on('message dispatched', data => {
        //   this.updateMessage(data);
        // })
        // // EVERYONE IN ROOM
        // this.socket.on('room joined', data => {
        //   this.joinSuccess()
        //})
    //}

    componentDidUpdate(oldProps, newProps){
        if(oldProps !== newProps){
            console.log("Prop change! Getting event info")
           // this.getEventinfo();
        }
    }

    // componentWillUnmount(){
    //     this.socket.emit('leave room', {
    //         room: this.props.user.active_event_id
    //     })
    // }

    // componentDidUpdate(oldProps, newProps){
    //     if(oldProps !== newProps){
    //         console.log("Inside component did update for ActiveEvent.js")
    //     }
    // }

    // updateMessage(message) {
    //     if(message ==="%END%"){
    //         console.log("End message parsed!");
    //         this.socket.emit('leave room', {
    //             room: this.props.user.active_event_id
    //         })
    //         this.setState({
    //             over: true
    //         })
    //         //Delete event from all lists
    //     }else{
    //         console.log("Legit message: ", message)
    //         let newMsg = this.state.messages;
    //         newMsg.push(message)
    //         this.setState({
    //         messages: newMsg
    //         })
    //     }
    //   }
    
    
    // sendMessage() {
    //     this.socket.emit('message sent', {
    //         message: this.state.input,
    //         room: this.props.user.active_event_id
    //     })
    // }


    // joinRoom(roomIn) {
    //     console.log("Inside join room, room = ", this.props.user.active_event_id);
    //     this.socket.emit('join room', {
    //         room: roomIn
    //     })
    // }
    // joinSuccess() {
    //     this.setState({
    //         joined: true
    //     })
    // }


/************************************************************************************ */

    getEventinfo(){
        const user = this.props.user||{};
        console.log("active event id: ", user.active_event_id)
        axios.get(`/event/getInfo?event_id=${user.active_event_id}`).then( res => {
            console.log(res.data[0])
            this.setState({
                event : res.data[0]
            })
        })
    }

    updateLeave(){
        const event = this.state.event||{};
        console.log(event)
        // if(event.users_remaining===Math.floor(event.users_invited/2))
        axios.put(`/event/leave?event_id=${event.event_id}&users_remaining=${event.users_remaining}`).then( response => {
            console.log(response);
            this.getEventinfo();
        })
        this.setState({
            image : wait
        })
        // this.socket.emit('message sent', {
        //     message: "%END%",
        //     room: this.props.user.active_event_id
        //   })
    }

    render(){
        // const user = this.props.user||{};
        const event = this.state.event||{};
        // let messageList = this.state.messages.map((val, i,)=>{
        //     return (
        //         <div className="messageContainer" key={i}>
        //             <p>{val}</p>
        //         </div>
        //     )
        // })

        return(
            <div className = "ActiveEvent" >
                { this.state.over === false ? 
                    (
                        <div>  Active Event

                        
                            <br/><br/>
                            <div className= "guest-list" >
                                <p>Event id: {event.event_id}</p>
                                <p>People left in Room: {event.users_remaining}</p>
                                <p>People Invited: {event.users_invited}</p>
                                <p>EOP limit: {Math.floor(event.users_invited/2)}</p>
                            </div>
                            <br/><br/>
                            {/* <div className="chatContainer">{messageList}</div> */}
                            
                            <input value={this.state.input} onChange={e => {
                                this.setState({
                                input: e.target.value
                                })
                            }} /><br/>
                            {/* <button onClick={this.sendMessage}>Message</button><br/> */}
                                
            
                            <button onClick={()=>this.updateLeave()}><img src={this.state.image} alt="temp-log" /></button>
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
        invites: state.invites
    }
}

export default connect(mapStateToProps, {getUser, getFriends, getEventInvites})(ActiveEvent);