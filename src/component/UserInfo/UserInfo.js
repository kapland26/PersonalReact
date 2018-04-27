import React, { Component } from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUser} from './../../ducks/reducer.js'

class UserInfo extends Component {

    constructor(){
        super();

        this.state={
            usernameIn: "",
            nameIn:""
        }
    }

    componentDidMount(){
        this.props.getUser();
    }

    handleUsernameIn(e){
        this.setState({
            usernameIn: e
        })
    }

    handleNameIn(e){
        this.setState({
            nameIn: e
        })
    }

    handleSave(){
        axios.put(`/auth/me/?username=${this.state.usernameIn}&name=${this.state.nameIn}`).then( () => {}).catch(function (error) {
            console.log("Error updating user data");
        });
        this.setState({
            usernameIn: "",
            nameIn:""
        })
    }

    render(){
        const user = this.props.user||{} 
        if(user && user.username!=null){
            console.log(user.username)
            return <Redirect to= '/home'/>
        }
        return(
            <div className = "UserInfo">
                Please provide some information to help your friends find you:
                <br/><br/>
                *Username:<br/>
                <input onChange={(e)=>this.handleUsernameIn(e.target.value)} type="text" value={this.state.usernameIn}/>
                <br/><br/>
                *Name:<br/>
                <input onChange={(e)=>this.handleNameIn(e.target.value)} type="text" value={this.state.nameIn} />
                <br/><br/>
                <Link to={'/home'}><button onClick={()=> this.handleSave()}> SAVE</button></Link>
                
                {/* <br/><br/>
                <button>Delete account</button> */}
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, {getUser})(UserInfo);