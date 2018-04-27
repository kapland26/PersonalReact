import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class AddFriends extends Component {

    constructor(){
        super();
        this.state={
            select: "name",
            input:""
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
        let searchResult = axios.get(`/users?${this.state.select}=${this.state.input}`).then( res => {
            return res.data;
        })
    }

    render(){
        return(
            <div className = "AddFriends">
                <input onChange={(e)=>this.handleInput(e.target.value)} type="text"/> 
                <select onClick={(e)=>this.handleSelect(e.target.value)}>
                    <option value="name">Name</option>
                    <option value="username">Username</option>
                    <option value="email">Email</option>
                </select>
                <button onClick={()=>this.handleSearch()}>Search</button>
                <br/>
                Display options here
                <br/><br/>
                <Link to={'/friends'}><button>Back</button></Link>    
            </div>
        )
    }
}
export default AddFriends;