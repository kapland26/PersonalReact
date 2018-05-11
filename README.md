To Do Eventually:
    JS: 
        - settings page with user info
        - Add event name
        - Restrict access to pages when not logged in
        - Update info displayed on event list

    HTML: 
        - Login page with title in middle and no nav bar, particle js
        - Fix css on find friends page
        - integrate user info and pictures into Home page

MAYBE do:
    - Add voting feature
    - Prevent reading same friend
    - Refresh home/ list disappearance problem (putting redux calls in app.js)
    - Timer on event leave
    - Sound alert when event is left
    - parallax on every page
    - unique username

Unrealistic goals:
    - check unique usernames, do not allow log-in click unless both boxes filled
    - Delete account
    - Do not allow adding of self/current friends to friends list
    - Make attend buttons inaccessable when active event

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