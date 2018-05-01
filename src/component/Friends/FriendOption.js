import React from 'react';

export default function FriendOption( props ) {

    return(
        <div className="FriendOption">
            Name: {props.name}<br/>
            Email: {props.email}<br/>
            Username: {props.username}<br/>
            Image: <img src={props.image} alt="profile"/><br/>
            <button>Add</button><br/><br/><br/>
        </div>
    )

}