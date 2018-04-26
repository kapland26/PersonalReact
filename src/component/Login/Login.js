import React from 'react';
require('dotenv').config();

export default function Login( props ) {

    return(
        <div className="Login">
            <a href={process.env.REACT_APP_LOGIN}>
                <button>Login</button>
            </a>
        </div>
    )

}