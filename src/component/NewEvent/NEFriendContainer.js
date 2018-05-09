import './NEFriendContainer.css';
import React from 'react';
import Checkbox from 'material-ui/Checkbox';

export default function NEFriendContainer( props ) {

    return(
        <div className="NEFriendContainer">
            <p>Name: {props.name}</p>
            <p>Username: {props.username}</p>
            <p>Image: <img src={props.image} alt="profile"/></p>
            <Checkbox
                checked={this.state.checkedA}
                onChange={this.handleChange('checkedA')}
                value="checkedA"
            />
        </div>
    )

}