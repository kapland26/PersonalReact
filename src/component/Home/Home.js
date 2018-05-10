import './Home.css'
import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link,  Redirect} from 'react-router-dom';
import {getUser, changeInfoStatus, getFriends, getEventInvites, setActiveEvent} from './../../ducks/reducer.js';
import ListInvitesContainer from './ListInvitesContainer.js';

import Button from 'material-ui/Button';
import { withStyles} from 'material-ui/styles';
import PropTypes from "prop-types"


class Home extends Component {

    constructor(){
        super();

        this.state ={
            redirect: false
        }

        this.deleteEventInvite = this.deleteEventInvite.bind(this);
        this.updateActiveEvent = this.updateActiveEvent.bind(this);
    }

    componentDidMount(){
        if(this.props.infoChanged===true){
            this.props.getUser();
            this.props.changeInfoStatus(false);
        }
        const user = this.props.user || {}
        this.props.getEventInvites(user.user_id);
        this.props.getFriends(user.user_id);
    }

    // componentDidUpdate(oldProps, newProps){
    //     if(oldProps !== newProps){
    //     // console.log("Inside component did update")
    //     }
    // }

    deleteEventInvite(event, usersInvited){
        console.log("Inside deleteEventInvite, event= ", event, " users_invited = ", usersInvited)
        axios.delete(`/attendance?event_id=${event}`).then((response) => {
            console.log(response);
            this.props.getEventInvites(this.props.user.user_id);
        })
    }

    updateActiveEvent(event){
        this.props.setActiveEvent(event, this.props.history);     
        // this.toggleRedirect(true);
    }
    render(){
        const {classes} = this.props;

        if(this.props.redir===true){
            return <Redirect to='/active-event'/>
        }
        // let {display_name, img, auth_id} = this.props.user;
        const user = this.props.user||{} 
        let invitesList = this.props.invites.map((val, i)=>{
        // let testList = [1, 2, 3];
        // let invitesList = testList.map( v(val, i)=>{
            return (
                <div className="invitesContainer" key={i}>
                    <ListInvitesContainer deleteEventInvite={this.deleteEventInvite} updateActiveEvent={this.updateActiveEvent} event_id={val.event_id} users_invited={val.users_invited} users_remaining={val.users_remaining} host={val.host? "Host Event": "No Host"}/>
                    {/* <ListInvitesContainer deleteEventInvite={this.deleteEventInvite} updateActiveEvent={this.updateActiveEvent} event_id={"1"} users_invited={3} users_remaining={3} host={ "No Host"}/> */}
                </div>
            )
        })
        return(
            <div className="Home">
                HOME   
                <br/><br/>
                Welcome, {user.name}! 
                <br/><br/>
                <div className="pendingEventContainer">
                    <div className="pendingEventTitleContainer">
                        Pending Events:
                    </div>
                {invitesList}
                </div>
                <br/><br/>
                <Link to={'/new-event'}><Button className={classes.button} variant="raised">START NEW EVENT</Button></Link>
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        user: state.user,
        infoChanged: state.infoChanged,
        invites: state.invites,
        redir: state.redir
    }
}
const styles = {
    button: {
      color: "white",
      backgroundColor: "#EF5350",
      fontFamily: 'Montserrat',
      marginBottom: '10px'
    }
}
Home.propTypes = {
    classes: PropTypes.object.isRequired
}

Home = withStyles(styles, {name: 'Home'})(Home);
export default connect(mapStateToProps, {getUser, changeInfoStatus, getFriends, getEventInvites, setActiveEvent})(Home);