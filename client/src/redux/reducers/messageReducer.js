import {
    GET_MESSAGES_REQUEST ,
    GET_MESSAGES_SUCCESS ,
    GET_MESSAGES_FAIL ,
    CLEAR_ERRORS ,
}
from '../constants/messageConstants';


export const messageReducer = (state = { messages : null } , action) => {
    switch (action.type) {
        case GET_MESSAGES_REQUEST:
            return {
                loading : true 
            }
        case GET_MESSAGES_SUCCESS:
            return {
                loading : false ,
                messages : action.payload  
            }
        case GET_MESSAGES_FAIL:
            return {
                loading : false ,
                messagesError : action.payload 
            }
        case CLEAR_ERRORS: 
            return {
                loading : false ,
                messagesError : null 
            }
        default:
            return state ;
    }
}