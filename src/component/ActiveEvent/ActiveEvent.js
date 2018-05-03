import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import './ActiveEvent.css'
import peace from './peace-temp.png';
import wait from './wait.png';

class ActiveEvent extends Component {

    constructor(){
        super();

        this.state= {
            event : {},
            image : peace
        }
    }

    componentDidMount(){
        this.getEventinfo();
    }

    getEventinfo(){
        const user = this.props.user||{};
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
        axios.put(`/event/leave?event_id=${event.event_id}&users_remaining=${event.users_remaining}`).then( response => {
            console.log(response);
            this.getEventinfo();
        })
        this.setState({
            image : wait
        })
    }

    render(){
        const user = this.props.user||{};
        const event = this.state.event||{};
        return(
            <div className = "ActiveEvent">
                Active Event
                <br/><br/>
                <div className= "guest-list" >
                    <p>Event id: {user.active_event_id}</p>
                    <p>People left in Room: {event.users_remaining}</p>
                    <p>People Invited: {event.users_invited}</p>
                    <p>EOP limit: {Math.ceil(event.users_invited/2)}</p>
                </div>
                <h2>{this.state.message}</h2>
                <br/><br/>
                <button onClick={()=>this.updateLeave()}><img src={this.state.image} alt="temp-log" /></button>
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

export default connect(mapStateToProps, {})(ActiveEvent);