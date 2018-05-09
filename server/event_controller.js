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
        const {users_invited, host, users} = req.query;
        console.log("Info= ",users_invited, host);
        let hostInput = null;
        if(host===true){
            hostInput = user_id;
        }
        console.log("host input= ", hostInput)
        const db = req.app.get('db')
        db.events.create_event([users_invited, users_invited, hostInput]).then( () =>{
            db.events.get_event_info([event_id]).then( (event) =>{
                res.status(200).send(event);
            })
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