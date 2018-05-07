import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
require('dotenv').config();

export default function Login( props ) {

    return(
        <div className="Login">
            <a href={process.env.REACT_APP_LOGIN}>
                <RaisedButton label="Login" primary={true} />
            </a>
        </div>
    )

}