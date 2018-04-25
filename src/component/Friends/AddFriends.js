import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class AddFriends extends Component {

    render(){
        return(
            <div className = "AddFriends">
                <input type="text"/> 
                <select>
                    <option value="name">Name</option>
                    <option value="username">Username</option>
                    <option value="email">Email</option>
                </select>
                <button>Search</button>
                <br/>
                Display options here
                <br/><br/>
                <Link to={'/friends'}><button>Back</button></Link>    
            </div>
        )
    }
}
export default AddFriends;