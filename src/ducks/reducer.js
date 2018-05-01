import axios from 'axios';

const initialState = {
    user: null,
    friends: []
}

const GET_USER_INFO = 'GET_USER_INFO';
const GET_FRIENDS = 'GET_FRIENDS';

function reducer(state = initialState, action){ 
   console.log("In reducer, action = "+action.type+", payload: "+action.payload)
    switch(action.type){
        case GET_USER_INFO+'_FULFILLED':
            return Object.assign({}, state, {user: action.payload})  
        case GET_FRIENDS+'_FULFILLED':
            return Object.assign({}, state, {friends: action.payload})
        default:
            return state;
    }
}

export function getUser(){
    let userData = axios.get('/auth/me').then( res => {
        return res.data;
    })
    return {
        type: GET_USER_INFO,
        payload: userData
    }
}
export function getFriends(userId){
    let friendsData = axios.get(`/friends/get?user1_id=${userId}`).then(res =>{
        let tempFriends = [];
        for(var i=0; i<res.data.length; i++){
            if(res.data[i].user1_id===userId.toString()){
                tempFriends.push(res.data[i].user2_id);
            }else{
                tempFriends.push(res.data[i].user1_id);
            }
        } 
        return tempFriends;
        // return res.data;
    })

    return {
        type: GET_FRIENDS,
        payload: friendsData
    }
}


export default reducer;