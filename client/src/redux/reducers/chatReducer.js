import {
    GET_CHATS_REQUEST ,
    GET_CHATS_SUCCESS ,
    GET_CHATS_FAIL ,
    CLEAR_ERRORS ,
}
from '../constants/chatConstants';


export const chatReducer = (state = { chats : null } , action) => {
    switch (action.type) {
        case GET_CHATS_REQUEST:
            return {
                loading : true 
            }
        case GET_CHATS_SUCCESS:
            return {
                loading : false ,
                chats : action.payload  
            }
        case GET_CHATS_FAIL:
            return {
                loading : false ,
                chatsError : action.payload 
            }
        case CLEAR_ERRORS: 
            return {
                loading : false ,
                chatsError : null 
            }
        default:
            return state ;
    }
}