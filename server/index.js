const express = require('express')
, session = require('express-session')
, passport = require('passport')
, Auth0Strategy = require('passport-auth0')
, massive = require('massive');
require('dotenv').config();

const app = express();

const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING,
} = process.env;

massive(CONNECTION_STRING).then( db=> {
    app.set('db', db);
    console.log("Database connnected")
})

app.use( session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  }));
app.use( passport.initialize() );
app.use( passport.session() );

passport.use( new Auth0Strategy({
    domain:       DOMAIN,
    clientID:     CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL:  CALLBACK_URL,
    scope: "openid profile"
   }, function(accessToken, refreshToken, extraParams, profile, done) {
    const db = app.get('db')
    const {id, displayName, picture} = profile;
    db.find_user([id]).then( users =>{
        console.log("inside db, users: ", users)
        if(users[0]){//Will return in array
            return done(null, users[0].user_id)
        }else{
            db.create_user([ id, displayName, picture]).then(createdUser=> {
                return done(null, createdUser[0].user_id)
            })
        }
    })
}));

passport.serializeUser( (id, done) => {
    console.log("inside serialize user")
    done(null, id);
});

passport.deserializeUser( (id, done) => {
    console.log("inside deserialize")
    app.get('db').find_session_user([id]).then(user => {
       done(null, user[0]);//user put on req for endpoint
    })
});

app.get('/auth', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/home',
    failureRedirect: 'http://localhost:3000'
}))
app.get('/auth/me', function(req, res){
    console.log("71: ",req.user)
    if( req.user) { //req.user is logged in user
        console.log("user is logged in. user:", JSON.stringify(req.user))
        res.status(200).send(req.user);
    } else{
        console.log("No user")
        res.status(200).send(null)
    }
})
app.get('/logout', function(req, res){
    console.log("logout")
    req.logOut();
    res.redirect('http://localhost:3000')
})

app.listen(SERVER_PORT, () =>
    console.log(`Listening on port: ${SERVER_PORT}`));

//  http://localhost:3005/auth