module.exports = {
    updateInfo: ( req, res ) => {
        let { username, name} = req.query;
        let {user_id} = req.user;

        // console.log("inside update info ", username, name)
        const db = req.app.get('db')
        db.users.update_user([username, name, user_id]).then( () => {
            db.users.get_user([user_id]).then( (user) =>{
                res.status(200).send(user);
            })
            .catch( (err) => {
                console.log(err)
                res.status(500).send(err) 
            });  
        })
    },
    searchUsers: (req, res) => {
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

        
        const db = req.app.get('db')
        var metricArr = metric.split("");
        // metricArr.pop();
        // metricArr.shift();
        metricArr.push('%');
        metric = metricArr.join("");


        // console.log("key = ", key, " metric = ", metric)
        if(key==="name"){
            db.users.search_user_name([metric]).then( (users) =>
            res.status(200).send(users))
            .catch( (err) => {
                console.log(err)
                res.status(500).send(err) 
            }); 
        }else if(key==="email"){
            db.users.search_user_email([metric]).then( (users) =>
            res.status(200).send(users))
            .catch( (err) => {
                console.log(err)
                res.status(500).send(err) 
            }); 
        }else{
            db.users.search_user_username([metric]).then( (users) =>
            res.status(200).send(users))
            .catch( (err) => {
                console.log(err)
                res.status(500).send(err) 
            }); 
        }
    },
    getUser: ( req, res ) => {
        let { user_id} = req.query;
        const db = req.app.get('db');
        db.users.get_user([user_id]).then( (user) =>
            res.status(200).send(user))
            .catch( (err) => {
                console.log(err)
                res.status(500).send(err) 
            });  
    },
    updateEvent: (req, res) => {
        let {user_id} = req.user;
        let {event_id} = req.query;
        
        const db = req.app.get('db');
        console.log("Inside update event, id: ", event_id, " user_id, ", user_id )
        db.users.update_event([event_id, user_id]).then( () =>{
            db.events.get_event_info([event_id]).then( (event) =>{
                console.log("Active event set, v middle, ", event_id)
                res.status(200).send(event);
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
    }
}