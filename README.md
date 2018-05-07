TOMORROW: 
    1. Active event page memory leak
    2. Put socketsw back in and ask yeven about problem
    3. Ask kevin about material UI next
    - Create new event (non host)
    - Create new event (host)

To Do Eventually:
    - Semantic UI
    - Get rid of github, make test google accounts with pictures and integrate into code
    - On event invite, show guest list and maybe a description?
    - Conditional display/change info on user info (delete option)
    - Host condition for active event
    - Update user settings, delete account
    - check unique usernames, do not allow log-in click unless both boxes filled
    - show if friends already in an event on invite list
    - Some kind of alert when event is left

MAYBE do:
    - Refresh home/ list disappearance problem (putting redux calls in app.js)
    - Nice login page with title in middle and no nav bar
    - Change settings
    - Make attend buttons inaccessable when active event
    - Restrict access to pages when not logged in
    - Do not allow adding of self/current friends to friends list
    - Mutual friendship
    - search database without case
    - Timer on event leave

Colors: black
    pink: #EC576B
    aqua: #4EC5C1
    lime: #ESE338

Routes:
<Route exact path='/' component={Home} />
<Route path='/active-event' component={ActiveEvent}/>
<Route path='/friends' component={Friends}/>
<Route path='/add-friends' component={AddFriends}/>
<Route path='/new-event' component={NewEvent}/>
<Route path='/invite-friends' component={InviteFriends}/>
<Route path='/user-info' component={UserInfo}/>

nodemon --watch /server

Forever Logged in:
app.use((req, res, next)=>{
    if(process.env.DEV_MODE){
        req.user = {
            id: 1,
            name: '<Your Name>',
            etc: 'blabla'
        }
    }
})