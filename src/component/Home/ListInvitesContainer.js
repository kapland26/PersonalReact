import './ListInvitesContainer.css'
import React, { Component } from 'react';
import {connect} from 'react-redux';

class ListInvitesContainer extends Component{

    render(){
        return(
            <div className="ListInvitesContainer">
                <p>Event: {this.props.event_id}</p>
                <p>Amount Invited: {this.props.users_invited}</p>
                <p>{this.props.host}</p>
                <p><button onClick= {()=>this.props.updateActiveEvent(this.props.event_id)}> Attend </button></p>
                <p> <button onClick= {()=>this.props.deleteEventInvite(this.props.event_id, this.props.users_invited)} > Delete </button></p>
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

export default connect(mapStateToProps, {})(ListInvitesContainer);