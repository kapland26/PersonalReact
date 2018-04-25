import React from 'react';
import {Route, Switch} from 'react-router-dom';

import ActiveEvent from './component/ActiveEvent/ActiveEvent.js';
import Friends from './component/Friends/Friends.js';
import AddFriends from './component/Friends/AddFriends.js';
import Home from './component/Home/Home.js';
import NewEvent from './component/NewEvent/NewEvent.js';
import UserInfo from './component/UserInfo/UserInfo.js';

export default (
    <div>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/active-event' component={ActiveEvent}/>
            <Route path='/friends' component={Friends}/>
            <Route path='/add-friends' component={AddFriends}/>
            <Route path='/new-event' component={NewEvent}/>
            <Route path='/user-info' component={UserInfo}/>
        </Switch>
    </div>
)