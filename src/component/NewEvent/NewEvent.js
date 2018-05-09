import React, { Component } from 'react';
import io from 'socket.io-client';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './NewEvent.css';
import NEFriendContainer from './NEFriendContainer.js'

import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { withStyles} from 'material-ui/styles';
import PropTypes from "prop-types";

class NewEvent extends Component {
   
    constructor(){
        super();

        this.state = {
            invited: [],
            hostEvent: false
        }
    }

    handleAdd(idIn, nameIn){
        console.log("Inside")
        if(this.state.invited.filter((val, i)=> {
            return(val.user_id === idIn)
            }) != []){
        }else{
            let newEl = {
                user_id: idIn,
                name: nameIn
            }
            let newArr = this.state.invited.slice();
            newArr.push(newEl)
            this.setState({
                invited: newArr
            })
        }   
    }

    render(){
        const {classes} = this.props;

        let testList = [0, 1, 2, 3];
        var friendList = testList.map((val, i)=> {
        // var friendList = this.props.friends.map((val, i)=> {
          return (
            <div className="NEFriendContainer" key={i}>
                <div className="userInfoContainer">
                {/* 
                <p>Image: <img src={val.image} alt="profile"/></p> 
                <p>{val.name}</p>
                <h3><p>( {val.username} )</p></h3>*/}
                <p><img src={"https://cdn3.iconfinder.com/data/icons/business-round-flat-vol-1-1/36/user_account_profile_avatar_person_student_female-512.png"} alt="profile"/></p> 
                <p>Deniz Kaplan</p>
                <h3><p>( Heres a Username ) </p></h3>
                </div>
                {/* < Button */}
                <Button onClick={()=> this.handleAdd(val.user_id, val.name)} variant="fab" mini color="primary" aria-label="add" className={classes.button}>
                    <AddIcon />
               </Button>    
            </div>
          )
        })  

        return(
            <div className = "NewEvent">
            <h1>New Event</h1><br/>
            Will you be hosting this event?   
            <Select className={classes.select}
                value={this.state.hostEvent}
                // onChange={this.handleChange}
                ><MenuItem value={false}>
                <em>No</em>
                </MenuItem>
                <MenuItem value={true}>Yes</MenuItem>
            </Select>
            <br/>
            What percent of users should leave before the party ends?   
            <Select className={classes.select}
                value={this.state.hostEvent}
                // onChange={this.handleChange}
                ><MenuItem value={false}>
                <em>50</em>
                </MenuItem>
                <MenuItem value={true}>Yes</MenuItem>
            </Select>
            <br/>
            {this.state.invited}
            <br/>
            <h2>Guest List:</h2>

            <div className="list-container">
                {friendList}
            </div>
            <Button className={classes.button} variant="raised">Invite friends</Button>
            <br/><br/>
            <Link to={'/active-event'}><Button className={classes.smallButton} variant="raised">START</Button></Link>
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
const styles = {
    button: {
        color: "white",
        backgroundColor: "#EF5350",
        fontFamily: 'Montserrat',
    },
    smallButton: {
        color: "white",
        backgroundColor: "black",
        fontFamily: 'Montserrat',
        height: '10px'
    },
    select: {
        margin: "10px",
        color: "#4DB6AC"
    }
}
NewEvent.propTypes = {
    classes: PropTypes.object.isRequired
}

NewEvent = withStyles(styles, {name: 'NewEvent'})(NewEvent);
export default connect(mapStateToProps, {})(NewEvent);



