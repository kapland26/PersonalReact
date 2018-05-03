import './ListInvitesContainer.css'
import React from 'react';
import {Link} from 'react-router-dom';

export default function ListInvitesContainer( props ) {

    return(
        <div className="ListInvitesContainer">
            <p>Event: {props.event_id}</p>
            <p>Amount Invited: {props.users_invited}</p>
            <p>{props.host}</p>
            <p> <Link to={'/active-event'}><button onClick= {()=>props.updateActiveEvent(props.event_id)}> Attend </button></Link></p>
            <p> <button onClick= {()=>props.deleteEventInvite(props.event_id, props.users_invited)} > Delete </button></p>
        </div>
    )

}