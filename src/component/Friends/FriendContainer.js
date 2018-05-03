import './FriendContainer.css';
import React from 'react';


export default function FriendContainer( props ) {

    return(
        <div className="FriendContainer">
            <p>Name: {props.name}</p>
            <p>Email: {props.email}</p>
            <p>Username: {props.username}</p>
            <p>Image: <img src={props.image} alt="profile"/></p>
            {/* <button onClick={()=>props.handleAddFriend(props.user_id)}>Add</button><br/><br/><br/> */}
        </div>
    )

}