import './ListInvitesContainer.css'
import React, { Component } from 'react';
import {connect} from 'react-redux';

import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles} from 'material-ui/styles';
import PropTypes from "prop-types"

class ListInvitesContainer extends Component{

    render(){
        const {classes} = this.props;
        return(
            <div className="ListInvitesContainer">
                <div className="infoContainer">
                    <h1><p>{this.props.event_name}:</p></h1>
                    <p>{this.props.users_invited} users invited, </p>
                    <p>{this.props.host}</p>
                </div>
                <div className="buttonContainer">
                    <p><Button className={classes.button} size="small"onClick= {()=>this.props.updateActiveEvent(this.props.event_id)}> Attend </Button></p>
                    <IconButton aria-label="Delete">
                        <DeleteIcon onClick={()=> this.props.deleteEventInvite(this.props.event_id, this.props.users_invited)}/>
                    </IconButton>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        user: state.user,
        invites: state.invites
    }
}
const styles = {
    button:{
        fontSize: "11px",
        backgroundColor: "#BDBDBD",
        fontFamily: 'Montserrat',
    }
}
ListInvitesContainer.propTypes = {
    classes: PropTypes.object.isRequired
}
ListInvitesContainer = withStyles(styles, {name: 'ListInvitesContainer'})(ListInvitesContainer);
export default connect(mapStateToProps, {})(ListInvitesContainer);