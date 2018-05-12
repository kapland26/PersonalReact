import './FriendContainer.css';
import React from 'react';
import IconButton from 'material-ui/IconButton';
import AddIcon from '@material-ui/icons/Add';

export default function AddFriendsContainer( props ) {

    return(
        <div className="AddFriendContainer">
            <div className="UserInfoContainer">
                <p><img src={props.img} alt="profile"/></p>
                {/* <div className="stackedInfoContainer">  */}
                    <h1><p>{props.name}</p></h1>
                    <h2><p>({props.username})</p></h2>
                    <h1><p>{props.email}</p></h1>
                {/* </div> */}
                
            </div>
            <IconButton aria-label="Add">
            <AddIcon onClick={()=> props.handleAddFriend(props.user_id)}/>
            </IconButton>
        </div>
    )
}