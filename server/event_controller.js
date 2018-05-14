module.exports = {
    getInvites: (req, res) => {
        const { user_id } = req.query;
        // console.log("Inside events controller, uesr_id: ", user_id)
        const db = req.app.get('db')
        db.attendance.get_invites([user_id]).then( (events) =>{
            // console.log("inside get events, ", events);
            res.status(200).send(events);
        })
        .catch( (err) => {
            console.log(err)
            res.status(500).send(err) 
        });     
    },
    getEventInfo: (req, res) => {
        const { event_id } = req.query;
        console.log("event_id  = ", event_id)
        const db = req.app.get('db')
        db.events.get_event_info([event_id]).then( (event) =>{
            res.status(200).send(event);
        })
        .catch( (err) => {
            console.log(err)
            res.status(500).send(err) 
        });    
    },
    create: (req, res) => {
        let {user_id} = req.user;
        const {end_user_amount, users_invited, host, name, users} = req.body;
        users.push(user_id);

        console.log("Create Info: EUA: ",end_user_amount, " users_invited: ", users_invited," host: ", host, ", name: ", name);
        console.log("users: ", users)
        let hostInput = null;
        if(host===true){
            hostInput = user_id;
        }        
        // console.log("host now=", hostInput)
        const db = req.app.get('db')
        db.events.create_event([end_user_amount, users_invited, hostInput, name]).then( (event) =>{
            let theStack = [];
            for(var i=0; i<users.length; i++){
                theStack.push(db.attendance.create_attendance([event[0].lastval,users[i]]))
            }
            Promise.all(theStack).then(()=>{
               //Update logged-in user's current event
                db.users.update_event([event[0].lastval, user_id]).then( () =>{
                    db.events.get_event_info([event[0].lastval]).then( (event1) =>{
                        res.status(200).send(event1);
                    })
                    .catch( (err) => {
                        console.log(err)
                        res.status(500).send(err) 
                    });  
                })
                .catch( (err) => {
                    console.log(err)
                    res.status(500).send(err) 
                }); 
            }).catch( (err) => {
                console.log(err)
                res.status(500).send(err) 
            });  
        })
    },
    leave:  (req, res) => {
        const { event_id, users_remaining } = req.query;
        console.log("Inside leave event, id=", event_id);

        const db = req.app.get('db')
        db.events.subtract_user([users_remaining-1, event_id]).then( () =>{
            db.events.get_event_info([event_id]).then( (event) =>{
                res.status(200).send(event);
            })
        })
        .catch( (err) => {
            console.log(err)
            res.status(500).send(err) 
        });    
    },
    delete: (req, res) => {
        const {event_id} = req.query;
        const {user_id} = req.user;
        console.log("Inside delete event, event_id = ", event_id);

        const db = req.app.get('db')
        db.events.delete_event([event_id]).then( () =>{
            db.attendance.delete_attendance([event_id]).then( () =>{
                    res.status(200).send();
            })
        })
        .catch( (err) => {
            console.log(err)
            res.status(500).send(err) 
        });  
    }
}