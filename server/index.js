const express = require('express')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , bodyParser = require('body-parser')
    , socket = require('socket.io')
    , massive = require('massive');
require('dotenv').config();
const uc = require('./user_controller.js')
    , fc = require('./friend_controller.js')
    , ec = require('./event_controller.js')
    , ac = require('./attendance_controller.js');

const app = express();

const {
    SERVER_PORT,
    SESSION_SECRET,
    REACT_APP_SUCCESS_REDIRECT,
    REACT_APP_FAILURE_REDIRECT,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING,
} = process.env;

app.use( bodyParser.json() );

app.use( express.static( `${__dirname}/../build` ) );

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
    // console.log("Profile: ",profile)
    const {id, name, picture} = profile;
    db.users.find_user([id]).then( users =>{
        if(users[0]){//Will return in array
            return done(null, users[0].user_id)
        }else{
            db.users.create_user([ id, picture]).then(createdUser=> {
                return done(null, createdUser[0].user_id)
            })
        }
    })
}));

passport.serializeUser( (id, done) => {
    // console.log("Inside serialize user: ",id)
    done(null, id);
});

passport.deserializeUser( (id, done) => {
    // console.log("Inside deserialize user, id: ",   )
    app.get('db').users.find_session_user([id]).then(user => {
       done(null, user[0]);//user put on req for endpoint
    })
});

app.get('/auth', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: REACT_APP_SUCCESS_REDIRECT,
    failureRedirect: REACT_APP_FAILURE_REDIRECT
}))
app.get('/auth/me', function(req, res){
    // console.log("Current user: ",req.user)
    if( req.user) { //req.user is logged in user
        res.status(200).send(req.user);
    } else{
        res.status(200).send(null)
    }
})

app.put('/user/updateInfo',uc.updateInfo);
app.get('/users', uc.searchUsers);
app.get('/user', uc.getUser); 
app.put('/user/updateEvent', uc.updateEvent);

app.get('/friends/get', fc.getAll);
app.post('/friend', fc.add);
app.delete('/friend', fc.delete)

app.get('/events', ec.getInvites);
app.get('/event/getInfo', ec.getEventInfo);
app.post('/event', ec.create);
app.put('/event/leave', ec.leave);
app.delete('/event/delete', ec.delete);

app.delete('/attendance', ac.rejectEvent);

app.get('/logout', function(req, res){
    req.logOut();
    res.redirect(REACT_APP_FAILURE_REDIRECT)
})

const io = socket(app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`)));

io.on('connection', socket => {
  // EVERYONE IN THE ROOM
  socket.on('join room', data => {
    console.log('Room joined', data.room)
    socket.join(data.room);
    io.to(data.room).emit('room joined');
  })
  socket.on('message sent', data => {
      console.log("Inside message sent, ", data.message)
      if(data.message==="%END%"){
          console.log("Inside if statement!")
      }
    io.to(data.room).emit('message dispatched', data.message);
  })

  socket.on('disconnect', () => {
    console.log('User Disconnected');
  })

  socket.on('leave room', data => {
    console.log('User Left Room');
    socket.leave(data.room);
  })
});
