To Do TODAY:
    - Display added friends on friends page
    - Delete friends from friends page
    - Events??

To Do Eventually:
    - Semantic UI
    - On event invite, show guest list and maybe a description?
    - Conditional display/change info on user info (delete option)
    - Host condition for active event
    - Change active event into list of invites and info, delete option that DOESNT count as leaving
    - Update user settings, delete account
    - check unique usernames, do not allow log-in click unless both boxes filled
    - show if friends already in an event on invite list
    - Some kind of alert when event is left

MAYBE do:
    - Restrict access to pages when not logged in
    - Do not allow adding of self/current friends to friends list
    - Mutual friendship
    - search database without case
    - Timer on event leave
    - Chat room

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