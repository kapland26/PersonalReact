import './Login.css'
import React, { Component }  from 'react';
import Button from 'material-ui/Button';
import { withStyles} from 'material-ui/styles';
import PropTypes from "prop-types";
require('dotenv').config();
  
class Login extends Component {
    
    render(){

        const {classes} = this.props;
    return(
        <div className="Login">
            <a href={process.env.REACT_APP_LOGIN}>
                <Button className={classes.button} variant="raised">LOGIN</Button>
            </a>
        </div>
      )
    }


}

const styles = {
    button: {
      color: "white",
      backgroundColor: "#EF5350",
      fontFamily: 'Montserrat',
    }
  }

Login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login);