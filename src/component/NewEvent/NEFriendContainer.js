import './NEFriendContainer.css';
import React from 'react';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


export default function FriendContainer( props ) {

    return(
        <div className="FriendContainer">
            <p>Name: {props.name}</p>
            <p>Username: {props.username}</p>
            <p>Image: <img src={props.image} alt="profile"/></p>
            <IconButton aria-label="Delete">
            <DeleteIcon onClick={()=> props.handleDelete(props.user_id)}/>
            </IconButton>
            {/* <button onClick={()=>props.handleAddFriend(props.user_id)}>Add</button><br/><br/><br/> */}
        </div>
    )

}