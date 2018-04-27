import axios from 'axios';

const initialState = {
    user: null,
}

const GET_USER_INFO = 'GET_USER_INFO';

function reducer(state = initialState, action){ 
//    console.log("In reducer, action = "+action.type+", payload: "+action.payload)
    switch(action.type){
        case GET_USER_INFO+'_FULFILLED':
            return Object.assign({}, state, {user: action.payload})  
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

export default reducer;