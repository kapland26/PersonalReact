import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {createEvent} from './../../ducks/reducer.js';

import './NewEvent.css';

import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { withStyles} from 'material-ui/styles';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import PropTypes from "prop-types";

class NewEvent extends Component {
   
    constructor(){
        super();

        this.state = {
            invitedId: [],
            invitedName: [],
            hostEvent: false,
            endPercent: 50
        }
    }

    componentDidMount(){
        if(!this.props.user){
            this.props.history.push('/');
        }
    }

    handleAdd(idIn, nameIn){
        console.log(this.state.invitedId.filter((val, i)=> {
            return(val === idIn)
            }).length )
        if(this.state.invitedId.filter((val, i)=> {
            return(val === idIn)
            }).length !== 0){
                console.log("going in if")
        }else{
            console.log("Inside else!, id = ", idIn,", name= ", nameIn)
            let newId = this.state.invitedId.slice();
            let newName = this.state.invitedName.slice();
            newId.push(idIn);
            newName.push(nameIn);
            this.setState({
                invitedId: newId,
                invitedName: newName
            })
            console.log(this.state.invitedId, this.state.invitedName)
        }   
    }

    handleInvite(){
        let usersIn = this.state.invitedId;
        let invitees = this.state.invitedId.length+1
        let endUserAmount= invitees - Math.floor(invitees*.01*this.state.endPercent);
        let host= this.state.hostEvent;
        console.log("EUA: ", endUserAmount, " , invitees: ", invitees, ", host: ", host," , usersIn: ", usersIn)
        this.props.createEvent(endUserAmount, invitees, host, usersIn);
    }

    handleHost(val) {
        console.log("Inside handleHost val=", val)
        this.setState({
            hostEvent: val
        })
    };

    handleEndPercent(val){
        this.setState({
            endPercent: val
        })
    }

    render(){
        const {classes} = this.props;

        console.log(this.props.redir)
        if(this.props.redir===true){
            return <Redirect to='/active-event'/>
        }

        // let testList = [0, 1, 2, 3];
        // var friendList = testList.map((val, i)=> {
        var friendList = this.props.friends.map((val, i)=> {
          return (
            <div className="NEFriendContainer" key={i}>
                <div className="userInfoContainer">
                <p><img src={val.image} alt="profile"/></p> 
                <p>{val.name}</p>
                <h3><p>( {val.username} )</p></h3>
                {/* <p><img src={"https://cdn3.iconfinder.com/data/icons/business-round-flat-vol-1-1/36/user_account_profile_avatar_person_student_female-512.png"} alt="profile"/></p> 
                <p>Deniz Kaplan</p>
                <h3>`<p>( Heres a Username ) </p></h3> */}
                </div>
                <Button onClick={()=> this.handleAdd(val.user_id, val.name)} variant="fab" mini color="primary" aria-label="add" className={classes.button}>
                    <AddIcon />
               </Button>    
            </div>
          )
        })  

        var inviteList = this.state.invitedName.map((val, i)=>{
            return (
                <div className="NEInviteContainer" key={i}>
                    <p> {val} </p>
                </div>
            )
        })

        return(
            <div className = "NewEvent">
            <h1>New Event</h1><br/>
            Will you be hosting this event?   
            <Select 
                className={classes.select}
                value={this.state.hostEvent}
                onChange={(e)=>this.handleHost(e.target.value)}>
                <MenuItem value={false}>
                <em>No</em>
                </MenuItem>
                <MenuItem value={true}>Yes</MenuItem>
            </Select>
            <br/>
            What percent of users should vote to leave before the party ends?   
                <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-simple">Percent</InputLabel>
                <Select
                    value={this.state.endPercent}
                    onChange={(e)=>this.handleEndPercent(e.target.value)}
                    className={classes.select}>
                    <MenuItem value={25}>
                    <em>25%</em>
                    </MenuItem>
                    <MenuItem value={50}>50%</MenuItem>
                    <MenuItem value={75}>75%</MenuItem>
                    <MenuItem value={100}>100%</MenuItem>
                </Select>
                </FormControl>


            <br/>
            <br/>
            <h2>Guest List:</h2>
                {inviteList}
            <br/><br/>    
            <div className="list-container">
                {friendList}
            </div>
            <Button onClick={()=>this.handleInvite()} className={classes.button} variant="raised">START</Button>
            </div>
        )
    }
}

function mapStateToProps(state){
  return{
      user: state.user,
      friends: state.friends,
      redir: state.redir
  }
}
const styles = {
    button: {
        color: "white",
        backgroundColor: "#EF5350",
        fontFamily: 'Montserrat',
        marginBottom: '10px'
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
export default connect(mapStateToProps, {createEvent})(NewEvent);



