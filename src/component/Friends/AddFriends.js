import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';

import AddFriendsContainer from './AddFriendsContainer.js'

class AddFriends extends Component {

    constructor(){
        super();
        this.state={
            select: "name",
            input:"",
            searchResults: []
        }
        this.handleAddFriend = this.handleAddFriend.bind(this);
    }

    handleSelect(e){
        this.setState({
            select: e
        })
    }
    handleInput(e){
        this.setState({
            input: e
        })
    }

    handleSearch(){
        console.log("Inside handle search!")
        axios.get(`/users?${this.state.select}=${this.state.input}`).then( res => {
            this.setState({
                searchResults : res.data
            })
        })
        this.setState({
            input: ""
        })
    }

    handleAddFriend(user_id){
        console.log("new user: ",user_id);
        let user = this.props.user || {};
        console.log("current user: ", user.user_id);
        let user1_id="";
        let user2_id="";

        if(user_id<this.props.user.user_id){
            user1_id=user_id;
            user2_id=this.props.user.user_id;
        }else{
            user1_id= this.props.user.user_id;
            user2_id= user_id;
        }
        axios.post(`/friend/?user1_id=${user1_id}&user2_id=${user2_id}`).then(function () {
            console.log("Friend added");
            //disallow add feature on list (delete list?)
        })
        .catch(function (error) {
            alert("Error adding friend!");
        });
    }

    render(){
        var resultList = this.state.searchResults.map((val, i)=>{
            return (
                <div className="friendOptionContainer" key={i}>
                    <AddFriendsContainer handleAddFriend={this.handleAddFriend} user_id={val.user_id} name={val.name} img={val.img} username={val.username} email={val.email} />
                </div>
            )
        })
        return(
            <div className = "AddFriends">
                <input onChange={(e)=>this.handleInput(e.target.value)} type="text"/> 
                <select onClick={(e)=>this.handleSelect(e.target.value)}>
                    <option value="name">Name</option>
                    <option value="username">Username</option>
                    <option value="email">Email</option> 
                </select>
                <button onClick={()=>this.handleSearch()}>Search</button>
                <br/><br/>
                {resultList}
                <br/><br/>
                <Link to={'/friends'}><button>Back</button></Link>    
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, {})(AddFriends);