module.exports = {
    updateInfo: ( req, res ) => {
        let { username, name} = req.query;
        let {user_id} = req.user;

        console.log("inside update info ", username, name)
        const db = req.app.get('db')
        db.update_user([username, name, user_id]).then( () =>
            res.status(200).send())
            .catch( (err) => {
                console.log(err)
                res.status(500).send(err) 
            });      
    },
    searchUsers: (req, res) => {
        console.log("Inside searchUsers!")
        let { username, name, email} = req.query;
        let metric = username ||name ||email;
        let key = "";
        if(metric ===name){
            key="name";
        }else if(metric===username){
            key="username";
        }else{
            key="email";
        }

        console.log("metric: ",metric," key= ", key)

        // db.search_users([key, metric]).then( (users) =>
        //     res.status(200).send(users))
        //     .catch( (err) => {
        //         console.log(err)
        //         res.status(500).send(err) 
        //     }); 
    }

}