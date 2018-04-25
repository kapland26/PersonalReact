import React from 'react';
import {Link} from 'react-router-dom';

export default function Home( props ) {

    return(
        <div className="Home">
            HOME   
            <br/>
            <br/>
            Welcome!
            <br/><br/>
            
            Current Invites:<br/>
            Event 1<Link to={'/active-event'}><button>Go</button></Link>
            <br/><br/>
            <Link to={'/new-event'}><button>START EVENT</button></Link>
        </div>
    )

}