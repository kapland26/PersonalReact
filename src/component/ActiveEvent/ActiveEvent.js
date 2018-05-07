import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux'; 
// import io from 'socket.io-client';
import './ActiveEvent.css';
import peace from './peace-temp.png';
import wait from './wait.png';
import {getUser, getFriends, getActiveEvent} from './../../ducks/reducer.js';

class ActiveEvent extends Component {

    constructor(){
        super();

        this.state= {
            image : peace,
            over: false,
        }
    }

    componentDidMount(){
        let user = this.props.user || {};
        // this.props.getActiveEvent(user.active_event_id);
    }

    updateLeave(){
        const event = this.props.activeEvent||{};
        console.log(event)
        axios.put(`/event/leave?event_id=${event.event_id}&users_remaining=${event.users_remaining}`).then( response => {
            console.log(response);
            this.props.getActiveEvent(this.props.user.active_event_id);
        })
        this.setState({
            image : wait
        })
    }

    render(){
        const event = this.props.activeEvent||{};
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
        activeEvent: state.activeEvent,
        invites: state.invites
    }
}

export default connect(mapStateToProps, {getUser, getFriends, getActiveEvent})(ActiveEvent);