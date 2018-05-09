5/7 Day:
1. Generate list with material ui
2. working current event, new event
3. Scrollbar

To Do Eventually:
    - On event invite, show guest list and maybe a description, no eventInfo
    - Conditional display/change info on user info (delete option)
    - Host condition for active event
    - Update user settings, delete account
    - check unique usernames, do not allow log-in click unless both boxes filled
    - show if friends already in an event on invite list
    - Some kind of alert when event is left
    - Make friend images round

UI: 
    - integrate user info and pictures into code
    - Check boxes on add friends
    - Make attend buttons inaccessable when active event

MAYBE do:
    - Prevent reading same friend
    - Refresh home/ list disappearance problem (putting redux calls in app.js)
    - Nice login page with title in middle and no nav bar
    - Change settings
    - Restrict access to pages when not logged in
    - Do not allow adding of self/current friends to friends list
    - Mutual friendship
    - search database without case
    - Timer on event leave
    - Delete account

Colors: black
    pink: #EC576B
    aqua: #4EC5C1
    lime: #ESE338

    red400: #EF5350
    teal300: #4DB6AC
    limeA200: #EEFF41

Google accounts to test with:
    kapland26@gmail.com
    kapland26backup@gmail.com
    deniz.kaplan@kaplanbg.com
    dktestaccount1@gmail.com
    dktestaccount2@gmail.com

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