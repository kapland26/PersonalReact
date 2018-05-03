import './Home.css'
import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getUser, getFriends, getEventInvites} from './../../ducks/reducer.js';
import ListInvitesContainer from './ListInvitesContainer.js';

class Home extends Component {

    constructor(){
        super();

        this.deleteEventInvite = this.deleteEventInvite.bind(this);
        this.updateActiveEvent = this.updateActiveEvent.bind(this);
    }

    componentDidMount(){
        this.props.getUser();
        const user = this.props.user || {}
        this.props.getEventInvites(user.user_id);
        this.props.getFriends(user.user_id);
    }

    componentDidUpdate(oldProps, newProps){
        if(oldProps !== newProps){
        console.log("Inside component did update")
        }
    }

    deleteEventInvite(event, usersInvited){
        console.log("Inside deleteEventInvite, event= ", event, " users_invited = ", usersInvited)
        axios.delete(`/attendance?event_id=${event}`).then((response) => {
            console.log(response);
            this.props.getEventInvites(this.props.user.user_id);
        })
    }

    updateActiveEvent(event){
        console.log("Inside update active event")
        axios.put(`/user/updateEvent?event_id=${event}`).then((response) => {
            console.log(response);
        })
    }

    render(){
        // let {display_name, img, auth_id} = this.props.user;
        const user = this.props.user||{} 
        let invitesList = this.props.invites.map((val, i)=>{
            return (
                <div className="invitesContainer" key={i}>
                    <ListInvitesContainer deleteEventInvite={this.deleteEventInvite} updateActiveEvent={this.updateActiveEvent} event_id={val.event_id} users_invited={val.users_invited} users_remaining={val.users_remaining} host={val.host? "Host Event": "No Host"}/>
                    {/* <ListInvitesContainer deleteEventInvite={this.deleteEventInvite} event_id={"1"} users_invited={"1"}users_remaining={"0"} host={"Host Event"}/> */}
                </div>
            )
        })
        return(
            <div className="Home">
                HOME   
                <br/><br/>
                Welcome, {user.name}! 
                <br/><br/>
                Pending Events:<br/><br/>
                {invitesList}
                <br/><br/>
                <Link to={'/new-event'}><button>START EVENT</button></Link>
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

export default connect(mapStateToProps, {getUser, getFriends, getEventInvites})(Home);