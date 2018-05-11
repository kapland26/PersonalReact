import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getFriends} from './../../ducks/reducer.js';
import './Friends.css';
import FriendContainer from './FriendContainer.js'

import Button from 'material-ui/Button';
import { withStyles} from 'material-ui/styles';
import PropTypes from "prop-types"

class Friends extends Component{

    constructor(){
        super();

        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount(){
        if(!this.props.user){
            this.props.history.push('/');
        }
    }

    handleDelete(id){
        axios.delete(`/friend?user2_id=${id}`).then((response) => {
            console.log(response);
            const user = this.props.user;// || {};
            console.log("user  = ,", user)
            this.props.getFriends(user.user_id);
        })
    }

    render(){
        const {classes} = this.props;
        var friendList = this.props.friends.map((val, i)=> {

        // let testList = [1, 2, 3];
        // let friendList = testList.map((val,i)=>{
            return (
                <div className="friendListContainer" key={i}>
                     <FriendContainer handleDelete={this.handleDelete} user_id={val.user_id} username={val.username} name={val.name} image={val.image}/>
                     {/* <FriendContainer handleDelete={this.handleDelete} user_id={"1"} username={"2"} name={"3"} email={"4"} image={"https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"}/> */}
                </div>
            )
        })        
        return(
            <div className="Friends">
                <div className="friendPageContainer">
                    <div className="friendTitleContainer">
                        <p>Friends</p>
                    </div>
                <br/>
                {friendList}
                </div>
                <br /><br/>
                <Link to={'/add-friends'}><Button className={classes.button}>Find Friends</Button></Link>
                <Link to={'/home'}><Button className={classes.button}>Home</Button></Link>        
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
      margin: '10px'
    }
}
Friends.propTypes = {
    classes: PropTypes.object.isRequired
}
Friends = withStyles(styles, {name: 'Friends'})(Friends);
export default connect(mapStateToProps, {getFriends})(Friends);