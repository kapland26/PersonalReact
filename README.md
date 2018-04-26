To Do: 
    - check unique usernames
    - Conditional start event/go to current event
    - Conditional display/change info on user info (delete option)
    - Host condition for active event
    - Change active event into list of invites and info, delete option that DOESNT count as leaving
    -Make sql table, in friend-friend: alphabetical order
    - Do contains query on names search for friends


To Do After Done:
    - Timer on event leave
    - show if friends already in an event on invite list



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