import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import FriendOption from './FriendOption.js'

class AddFriends extends Component {

    constructor(){
        super();
        this.state={
            select: "name",
            input:"",
            searchResults: []
        }
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
            console.log("Inside res function")
            console.log(res.data[0].user_id)
            this.setState({
                searchResults : res.data
            })
        })
        this.setState({
            input: ""
        })
    }

    handleAddFriend(user_id){
        
    }

    render(){
        var resultList = this.state.searchResults.map((val, i)=>{
            return (
                <div className="friendOptionContainer" key={i}>
                    <FriendOption user_id={val.user_id} name={val.name} img={val.img} username={val.username} email={val.email} />
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
export default AddFriends;