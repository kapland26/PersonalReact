import React from 'react';
import {Link} from 'react-router-dom';

export default function Friends( props ) {

    return(
        <div className="Friends">
        Friends
        <br/><br/>
        List of all friends Names (Usernames) +Delete Option
        <br /><br/>
        <Link to={'/add-friends'}><button>Find Friends</button></Link>
        <Link to={'/'}><button>Home</button></Link>        
        </div>
    )

}