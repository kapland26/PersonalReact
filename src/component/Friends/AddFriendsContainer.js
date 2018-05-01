import React from 'react';

export default function AddFriendsContainer( props ) {

    return(
        <div className="AddFriendsContainer">
            Name: {props.name}<br/>
            Email: {props.email}<br/>
            Username: {props.username}<br/>
            Image: <img src={props.image} alt="profile"/><br/>
            <button onClick={()=>props.handleAddFriend(props.user_id)}>Add</button><br/><br/><br/>
        </div>
    )

}