import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getFriends} from './../../ducks/reducer.js';

import FriendContainer from './FriendContainer.js'

class Friends extends Component{

    constructor(){
        super();

        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete(id){
        axios.delete(`/friend?user2_id=${id}`).then((response) => {
            console.log(response);
            const user = this.props.user;// || {};
            console.log("user  = ,", user)
            this.props.getFriends(user.user_id);
        })
    }

    render(){
        var friendList = this.props.friends.map((val, i)=> {
            return (
                <div className="friendListContainer" key={i}>
                     <FriendContainer handleDelete={this.handleDelete} user_id={val.user_id} username={val.username} name={val.name} email={val.email}/>
                </div>
            )
        })        
        return(
            <div className="Friends">
            Friends
            <br/><br/>
            {friendList}
            <br /><br/>
            <Link to={'/add-friends'}><button>Find Friends</button></Link>
            <Link to={'/home'}><button>Home</button></Link>        
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        user: state.user,
        friends: state.friends
    }
}
export default connect(mapStateToProps, {getFriends})(Friends);