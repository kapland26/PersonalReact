import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
// import {red400, teal300, limeA200, black} from 'material-ui/styles/colors';
import {connect} from 'react-redux';
import {getUser, setUser, changeInfoStatus} from './../../ducks/reducer.js'
import './UserInfo.css';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withStyles} from 'material-ui/styles';
import PropTypes from "prop-types";

class UserInfo extends Component {

    constructor(){
        super();

        this.state={
            usernameIn: "",
            nameIn:"",
            emailIn:"",
        }
    }

    componentDidMount(){
        this.props.getUser();
        const user = this.props.user||{} 
        this.setState({
            nameIn: user.name
        })
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

    handleEmailIn(e){
        this.setState({
            emailIn: e
        })
    }

    handleSave(){
        this.props.setUser(this.state.usernameIn, this.state.nameIn);
        this.props.changeInfoStatus(true);
        this.setState({
            usernameIn: "",
            nameIn:"",
            emailIn:"",
            imageIn: ""
        })
    }

    render(){
        const {classes} = this.props;
        const user = this.props.user||{} 
        if(user && user.username!=null){
            console.log(user.username)
            return <Redirect to= '/home'/>
        }
        return(
            <div className = "UserInfo">
                <h1>Please provide some information to help your friends find you:</h1>
                <br/>
                <TextField  
                    id="usernameIn"
                    label="Username *"
                    className={classes.textField}
                    onChange={(e)=>this.handleUsernameIn(e.target.value)}
                    value={this.state.usernameIn} 
                    margin= "dense" 
                />
                <br/><br/>
               
                <TextField
                    id="nameIn"
                    label="Name *"
                    className={classes.textField}
                    onChange={(e)=>this.handleNameIn(e.target.value)}
                    value={this.state.nameIn}
                    margin= "dense" 
                /> 
                <br/><br/>
                <TextField
                    id="emailIn"
                    label="Email "
                    className={classes.textField}
                    onChange={(e)=>this.handleEmailIn(e.target.value)}
                    value={this.state.emailIn} 
                    margin= "dense" 
                />
                <br/><br/>
                <Link to={'/home'}><Button onClick={()=> this.handleSave()}className={classes.button} variant="fab"> ✔ </Button></Link>
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
const styles = {
    button: {
        color: "white",
        backgroundColor: "#EF5350",
        fontFamily: 'Montserrat',
    },
    textField: {
        color: "#EF5350",
    },
  }

UserInfo.propTypes = {
    classes: PropTypes.object.isRequired
}
UserInfo = withStyles(styles, {name: 'UserInfo'})(UserInfo);
export default connect(mapStateToProps, {getUser, setUser, changeInfoStatus})(UserInfo);