import './FriendContainer.css';
import React from 'react';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


export default function FriendContainer( props ) {
    return(
        <div className="FriendContainer">
            <div className="UserInfoContainer">
                <p><img src={props.image} alt="profile"/></p>
                <p>{props.name}</p> 
                <h2> <p>( {props.username} )</p></h2>
            </div>  
            <IconButton aria-label="Delete">
            <DeleteIcon onClick={()=> props.handleDelete(props.user_id)}/>
            </IconButton>
        </div>
    )
}