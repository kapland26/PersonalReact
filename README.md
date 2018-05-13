Today:
2. Stress test events
3. Fix info displayed on event list
4. Add particles to leave page

MAYBE do:
    - Make email on first user-info page work
    - Prevent reading same friend
    - Sound alert when event is left
    - parallax on every page

Unrealistic goals:
    - check unique usernames, do not allow log-in click unless both boxes filled
    - Delete account
    - Do not allow adding of self/current friends to friends list
    - Make attend buttons inaccessable when active event

Colors: black
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