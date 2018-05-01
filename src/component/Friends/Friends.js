import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getFriends} from './../../ducks/reducer.js'

import FriendContainer from './FriendContainer.js'

class Friends extends Component{

    componentDidMount(){
        const user = this.props.user||{} 
        this.props.getFriends(user.user_id);
        console.log(this.props.friends);
    }

    render(){
        var friendList = this.props.friends.map((val, i)=> {
            console.log("val =",val)
            // return (
            //     <div className="friendListContainer" key={i}>
            //         {/* <FriendContainer user_id={} */}
            //     </div>
            // )
        })        
        return(
            <div className="Friends">
            Friends
            <br/><br/>
            List of all friends Names (Usernames) +Delete Option
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