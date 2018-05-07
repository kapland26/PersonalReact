import axios from 'axios';

const initialState = {
    user: null,
    activeEvent: {},
    friends: [],
    invites: []
}

const GET_USER_INFO = 'GET_USER_INFO';
const GET_ACTIVE_EVENT = 'GET_ACTIVE_EVENT';
const SET_ACTIVE_EVENT = 'SET_ACTIVE_EVENT';
const GET_FRIENDS = 'GET_FRIENDS';
const GET_EVENT_INVITES = 'GET_EVENT_INVITES';

function reducer(state = initialState, action){ 
//    console.log("In reducer, action = "+action.type+", payload: "+action.payload)
    switch(action.type){
        case GET_USER_INFO+'_FULFILLED':
            // console.log("got user, payload: ", action.payload)
            return Object.assign({}, state, {user: action.payload})  
        case GET_ACTIVE_EVENT+'_FULFILLED':
            return Object.assign({}, state, {activeEvent: action.payload})
        case SET_ACTIVE_EVENT+'_FULFILLED':
            return Object.assign({}, state, {activeEvent: action.payload})
        case GET_FRIENDS+'_FULFILLED':
            return Object.assign({}, state, {friends: action.payload})
        case GET_EVENT_INVITES+'_FULFILLED':
            return Object.assign({}, state, {invites: action.payload})
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
export function getActiveEvent(eventId){
   let eventData = axios.get(`/event/getInfo?event_id=${eventId}`).then( res => {
        return res.data[0];
    })
    return {
        type: GET_ACTIVE_EVENT,
        payload: eventData
    }
}
export function setActiveEvent(eventId){
    let eventData = axios.put(`/user/updateEvent?event_id=${eventId}`).then(res => {
        return res.data[0];
    })
    return {
        type: SET_ACTIVE_EVENT,
        payload: eventData
    }
}
export function getFriends(userId){
    let friendsData = axios.get(`/friends/get?user1_id=${userId}`).then(res =>{
        return res.data;
    })
    return {
        type: GET_FRIENDS,
        payload: friendsData
    }
}
export function getEventInvites(userId){
    let inviteData = axios.get(`/events?user_id=${userId}`).then( res => {
        return res.data;
    })
    return {
        type: GET_EVENT_INVITES,
        payload: inviteData
    }
}

export default reducer;