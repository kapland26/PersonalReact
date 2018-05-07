module.exports = {
    getAll: (req, res) => {
        const { user1_id } = req.query;
        const retArr = [];
        // console.log("Inside friends controller, ")
        const db = req.app.get('db')
        db.friends.get_friends([user1_id]).then( (friends) =>{
            let theStack = [];
            for(var i=0; i<friends.length; i++){
                if(friends[i].user1_id===user1_id ){
                   theStack.push(db.users.get_user([friends[i].user2_id]))
                }else{
                   theStack.push(db.users.get_user([friends[i].user1_id]))
                }
            } 
            Promise.all(theStack).then( (users)=> {
                for(var j=0; j<users.length; j++){
                    retArr.push({
                        user_id: users[j][0].user_id,
                        username: users[j][0].username,
                        name: users[j][0].name,
                        image: users[j][0].img,
                        email: users[j][0].email
                    })
                }
                res.status(200).send(retArr);
            }).catch( (err) => {
                    console.log(err)
                    res.status(500).send(err) 
                });  
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
    delete: ( req, res ) => {
        const { user2_id} = req.query;
        const {user_id} = req.user;

        console.log("Inside delete friends!, user2_id: ", user2_id, " user1_id: ", user_id)

        let firstId = "", secondId = ""; 

        if(parseInt(user2_id) < parseInt(user_id)){
            firstId =  user2_id;
            secondId = user_id;
        }else{
            firstId = user_id;
            secondId = user2_id;
        }

        const db = req.app.get('db')
        db.friends.delete_friend([firstId.toString(), secondId.toString()]).then( () =>
            res.status(200).send())
            .catch( (err) => {
                console.log(err)
                res.status(500).send(err) 
            });      
    }
}