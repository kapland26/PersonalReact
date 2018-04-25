import React, { Component } from 'react';

class UserInfo extends Component {

    render(){
        return(
            <div className = "UserInfo">
                Please provide some information to help your friends find you:
                <br/>
                (* items must be filled out)
                <br/><br/>
                *Username:<br/>
                <input type="text" />
                <br/><br/>
                *Name:<br/>
                <input type="text" />
                <br/><br/>
                Email:<br/>
                <input type="text" />
                <br/><br/>
                <button> SAVE</button>
                
                {/* <br/><br/>
                <button>Delete account</button> */}
            </div>
        )
    }
}
export default UserInfo;