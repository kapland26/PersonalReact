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
    leave:  (req, res) => {
        const { event_id, users_remaining } = req.query;
        console.log("Inside leave event, id=", event_id);
        //event_id ==host?? Cancel event

        const db = req.app.get('db')
        db.events.subtract_user([users_remaining-1, event_id]).then( () =>{
            res.status(200).send();
        })
        .catch( (err) => {
            console.log(err)
            res.status(500).send(err) 
        });    
    }
}