import './ListInvitesContainer.css'
import React from 'react';

export default function ListInvitesContainer( props ) {

    return(
        <div className="ListInvitesContainer">
            <p>Event: {props.event_id}</p>
            <p>Amount Invited: {props.users_invited}</p>
            <p>{props.host}</p>
            <p> <button> Attend </button></p>
            <p> <button onClick= {()=>props.deleteEventInvite(props.event_id, props.users_invited)} > Delete </button></p>
        </div>
    )

}