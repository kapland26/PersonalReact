module.exports = {
    getAll: (req, res) => {
        const { user1_id } = req.query;
        // console.log("Inside friends controller, ")
        const db = req.app.get('db')
        db.friends.get_friends([user1_id]).then( (friends) =>{
            // console.log("inside get friends, ", friends);
            res.status(200).send(friends);
        })
        .catch( (err) => {
            console.log(err)
            res.status(500).send(err) 
        });     
    },
    add: ( req, res ) => {
        const { user1_id, user2_id} = req.query;

        const db = req.app.get('db')
        db.friends.add_friend([user1_id, user2_id]).then( () =>
            res.status(200).send())
            .catch( (err) => {
                console.log(err)
                res.status(500).send(err) 
            });      
    },
}