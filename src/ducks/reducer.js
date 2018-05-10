import axios from 'axios';

const initialState = {
    user: null,
    infoChanged: false,
    activeEvent: {},
    friends: [],
    invites: [],
    redir: false
}

const GET_USER_INFO = 'GET_USER_INFO';
const SET_USER_INFO = 'SET_USER_INFO';
const CHANGE_INFO_STATUS = 'CHANGE_INFO_STATUS';
const GET_ACTIVE_EVENT = 'GET_ACTIVE_EVENT';
const SET_ACTIVE_EVENT = 'SET_ACTIVE_EVENT';
const RESET_ACTIVE_EVENT = 'RESET_ACTIVE_EVENT';
const MAKE_REDIR_FALSE = 'MAKE_REDIR_FALSE';
const GET_FRIENDS = 'GET_FRIENDS';
const GET_EVENT_INVITES = 'GET_EVENT_INVITES';
const CREATE_EVENT = 'CREATE_EVENT';
const LEAVE_EVENT = 'LEAVE_EVENT';
const DELETE_EVENT = 'DELETE_EVENT';

function reducer(state = initialState, action){ 
//    console.log("In reducer, action = "+action.type+", payload: "+action.payload)
    switch(action.type){
        case GET_USER_INFO+'_FULFILLED':
            // console.log("got user, payload: ", action.payload)
            return Object.assign({}, state, {user: action.payload})  
        case SET_USER_INFO+'_FULFILLED':
            return Object.assign({}, state, {user: action.payload})
        case CHANGE_INFO_STATUS:
            console.log("In change info status, ", action.payload)
            return Object.assign({}, state, {infoChanged: action.payload})
        case GET_ACTIVE_EVENT+'_FULFILLED':
            return Object.assign({}, state, {activeEvent: action.payload})
        case SET_ACTIVE_EVENT+'_FULFILLED':
            return Object.assign({}, state, {activeEvent: action.payload, redir: true})
        case RESET_ACTIVE_EVENT:
            return Object.assign({}, state, {activeEvent: action.payload})
        case MAKE_REDIR_FALSE:
            return Object.assign({}, state, {redir: action.payload})
        case GET_FRIENDS+'_FULFILLED':
            return Object.assign({}, state, {friends: action.payload})
        case GET_EVENT_INVITES+'_FULFILLED':
            return Object.assign({}, state, {invites: action.payload})
        case CREATE_EVENT+'_FULFILLED':
            console.log("redir should be true!")
            return Object.assign({}, state, {activeEvent: action.payload, redir: true})
        case LEAVE_EVENT+'_FULFILLED':
            return Object.assign({}, state, {activeEvent: action.payload})
        case DELETE_EVENT+'_FULFILLED':
            return Object.assign({}, state, {activeEvent: action.payload})
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
export function setUser(username, name){
    let userData = axios.put(`/user/updateInfo/?username=${username}&name=${name}`).then( res =>{
            return res.data;
    })
    return {
        type: GET_USER_INFO,
        payload: userData
    }
}
export function changeInfoStatus(status){
    return {
        type: CHANGE_INFO_STATUS,
        payload: status
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
export function setActiveEvent(eventId, hist){
    let eventData = axios.put(`/user/updateEvent?event_id=${eventId}`).then(res => {
        hist.push('/active-event');
        console.log("data", res.data)
        return res.data[0];
    })
    return {
        type: SET_ACTIVE_EVENT,
        payload: eventData
    }
}
export function resetActiveEvent(){
    return {
        type: RESET_ACTIVE_EVENT,
        payload: null
    }
}
export function  makeRedirFalse(){
    return{
        type: MAKE_REDIR_FALSE,
        payload: false
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
export function createEvent(end_user_amount, users_invited, host, usersIn){
    let body = {
        users: usersIn
    }
    console.log("Inside reducer: ",usersIn)
    let eventData = axios.post(`/event?end_user_amount=${end_user_amount}&users_invited=${users_invited}&host=${host}`, body).then(res => {
        return res.data[0];
    })
    return{
        type: CREATE_EVENT,
        payload: eventData
    }
}
export function leaveEvent(event_id, users_remaining){
    let eventData = axios.put(`/event/leave?event_id=${event_id}&users_remaining=${users_remaining}`).then( res => {
        return res.data[0];
    })
    return{
        type: LEAVE_EVENT,
        payload: eventData
    }
}
export function deleteEvent(event_id){
    let eventData = {};
    axios.delete(`/event/delete?event_id=${event_id}`).then( () => {
        console.log("Event deleted!")
    })
    return{
        type: DELETE_EVENT,
        payload: eventData
    }
}
export default reducer;