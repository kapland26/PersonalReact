import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {getFriends} from './../../ducks/reducer.js';

import TextField from 'material-ui/TextField';
import AddFriendsContainer from './AddFriendsContainer.js'
import Button from 'material-ui/Button';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from 'material-ui/IconButton';
import { withStyles} from 'material-ui/styles';
import PropTypes from "prop-types"
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

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

    componentDidMount(){
        if(!this.props.user){
            // this.props.history.push('/');
        }
    }

    handleSelect(e){
        this.setState({
            select: e
        })
    }
    handleChange = name => event => {
        console.log("name = ", name, " , event= ", event)
        this.setState({
          [name]: event.target.value,
        });
    };

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
        this.props.getFriends(user.user_id);
    }

    render(){
        const {classes} = this.props;
        // let testList = [1,2,3,4];
        // let resultList = testList.map((val, i)=>{
        var resultList = this.state.searchResults.map((val, i)=>{
            return (
                <div className="friendOptionContainer" key={i}>
                    <AddFriendsContainer handleAddFriend={this.handleAddFriend} user_id={val.user_id} name={val.name} img={val.img} username={val.username} email={val.email} />
                    {/* <AddFriendsContainer handleAddFriend={this.handleAddFriend} user_id="1" name="Deniz Kaplan" img="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png" username="kapland26" email= "kapland26@gmail.com" /> */}
                </div>
            )
        })
        return(
            <div className = "AddFriends">
                <TextField  
                    id="input"
                    label="Search"
                    className={classes.textField}
                    onChange={this.handleChange('input')}
                    value={this.state.input} 
                    margin= "dense" 
                />
                <Select 
                    className={classes.select}
                    value={this.state.select}
                    onChange={(e)=>this.handleSelect(e.target.value)}>
                    <MenuItem value="name">
                    <em>Name</em>
                    </MenuItem>
                    <MenuItem value="username">Username</MenuItem>
                    <MenuItem value="email">Email</MenuItem>
                </Select>

                <IconButton aria-label="Search">
                <SearchIcon onClick={()=> this.handleSearch()}/>
                </IconButton>
                <br/><br/>
                {resultList}
                <br/><br/>
                <Link to={'/friends'}> <Button className={classes.button}>Back</Button><br/></Link>    
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
        margin: "10px"
    },
    imageButton: {
        width: "30px",
        backgroundColor: "#BDBDBD",
        marginBottom: "10px"
    },
    select: {
        margin: "10px",
        fontFamily: 'Montserrat',
        color: "#4DB6AC"
    },
    textField: {
        color: "#EF5350",
    },
}
AddFriends.propTypes = {
    classes: PropTypes.object.isRequired
}

AddFriends = withStyles(styles, {name: 'AddFriends'})(AddFriends);
export default connect(mapStateToProps, {getFriends})(AddFriends);