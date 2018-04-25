const initialState = {
}


function reducer(state = initialState, action){ 
   // console.log("In reducer, action = "+action.type+", payload: "+action.payload)
    switch(action.type){
        default:
            return state;
    }
}

// export function updateName(name){
//     return{
//         type: UPDATE_NAME,
//         payload: name
//     };
// }


export default reducer;