import './Settings.css'
import React, { Component } from 'react';
import {getUser, updateUserSettings} from './../../ducks/reducer.js';
import {connect} from 'react-redux';

import TextField from 'material-ui/TextField';
import { withStyles} from 'material-ui/styles';
import PropTypes from "prop-types"
import Button from 'material-ui/Button';

class Settings extends Component {

  constructor(){
    super();

    this.state={
      editing: false,
      usernameIn: '',
      nameIn: '',
      emailIn: '',
      imageIn: ''
    }
  }

  handleChange = name => event => {
    console.log("name = ", name, " , event= ", event)
    this.setState({
      [name]: event.target.value,
    });
  };

  handleEdit(e){
    console.log("In handle edit")
    if(e==="save"){
      //update user info
      let user = this.props.user || {};
      console.log("user= ",user)
      let usernameOut = user.username;
      let nameOut = user.name;
      let emailOut = user.email;
      let imageOut = user.img;
      if (this.state.usernameIn !== ''){
        console.log("updating username, ", this.state.usernameIn)
        usernameOut = this.state.usernameIn;
      } if (this.state.nameIn !== ''){
        console.log("updating name, ", this.state.nameIn)
        nameOut = this.state.nameIn;
      } if (this.state.emailIn !== ''){
        console.log("updating email, ", this.state.emailIn)
        emailOut = this.state.emailIn;
      } if (this.state.imageIn !== ''){
        console.log("updating image, ",this.state.imageIn)
        imageOut = this.state.imageIn;
      }
      this.props.updateUserSettings(usernameOut, nameOut, emailOut, imageOut);
    }
    if (e==="edit"){
      this.setState({
        editing: true
      })
    }else{
      this.setState({
        editing: false
      })
    }
  }

  render() {
    const {classes} = this.props;
    let user = this.props.user || {};
    return (
      <div className="Settings">
      
      { this.state.editing === false ? 
        (
          <div className="display">
            <h1>SETTINGS</h1>
            <div className="settingsContainer">
            <div className="imgContainer">
              <img src={user.img} alt="profile"/>
            </div>
            <div className="infoContainer">
              <li><h2>Username:</h2>{user.username}</li><br/>
              <li><h2>Name:</h2>{user.name}</li><br/>
              <li><h2>Email:</h2>{user.email}</li><br/>
            </div>
            </div>
            <Button variant="fab" mini color="primary" aria-label="edit" className={classes.button} onClick={()=>this.handleEdit("edit")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M2 12.88V16h3.12L14 7.12 10.88 4 2 12.88zm14.76-8.51c.33-.33.33-.85 0-1.18l-1.95-1.95c-.33-.33-.85-.33-1.18 0L12 2.88 15.12 6l1.64-1.63z"/></svg>
            </Button>
          </div>
        ):
        <div className="edit">
          <div className="settingsContainer">
            < div className="userInputContainer">
              <p> Alter any fields you'd like updated: </p>
              <TextField  
                id="usernameIn"
                label="Username"
                className={classes.textField}
                onChange={this.handleChange('usernameIn')}
                // onChange={this.handleChange.bind(this, 'usernameIn')}
                value={this.state.usernameIn} 
                margin= "dense" 
              />
              <TextField  
                id="nameIn"
                label="Name"
                className={classes.textField}
                onChange={this.handleChange('nameIn')}
                value={this.state.nameIn} 
                margin= "dense" 
              />
              <TextField  
                id="emailIn"
                label="Email"
                className={classes.textField}
                onChange={this.handleChange('emailIn')}
                value={this.state.emailIn} 
                margin= "dense" 
              />
              <TextField  
                id="imageIn"
                label="Image"
                className={classes.textField}
                onChange={this.handleChange('imageIn')}
                value={this.state.imageIn} 
                margin= "dense" 
              />
            </div>
          </div>
          <div className="buttonContainer">
            <Button variant="fab" mini color="primary" aria-label="done" className={classes.button} onClick={()=>this.handleEdit("save")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            </Button>
            <Button variant="fab" mini color="primary" aria-label="done" className={classes.button} onClick={()=>this.handleEdit("cancel")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
            </Button>
          </div>
        </div>
      }
      </div>
    );
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
      marginBottom: '10px'
    },
    textField: {
        color: "#EF5350",
    },
}
Settings.propTypes = {
    classes: PropTypes.object.isRequired
}

Settings = withStyles(styles, {name: 'Settings'})(Settings);
export default connect(mapStateToProps, {getUser, updateUserSettings})(Settings);
