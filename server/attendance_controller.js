module.exports = {
    rejectEvent: ( req, res ) => {
        let {event_id} = req.query;
        let {user_id} = req.user;

        console.log("inside reject event: user  = ", user_id, " , event: ", event_id);
 
        const db = req.app.get('db')
        db.attendance.delete_invite([user_id, event_id]).then( () =>
            res.status(200).send())
            .catch( (err) => {
                console.log(err)
                res.status(500).send(err) 
            });      
    }
}