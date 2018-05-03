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
    }
}