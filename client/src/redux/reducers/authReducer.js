import {
    USER_REGISTER_REQUEST ,
    USER_REGISTER_SUCCESS ,
    USER_REGISTER_FAIL ,
    USER_LOGIN_REQUEST ,
    USER_LOGIN_SUCCESS ,
    USER_LOGIN_FAIL ,
    USER_LOGOUT_REQUEST ,
    USER_LOGOUT_SUCCESS ,
    USER_LOGOUT_FAIL ,
    CLEAR_ERRORS 
} from '../constants/authConstants';

export const authReducer = ( state = { user : null } , action ) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
        case USER_LOGIN_REQUEST :
        case USER_LOGOUT_REQUEST: 
            return {
                loading : true 
            }
        case USER_REGISTER_SUCCESS:
        case USER_LOGIN_SUCCESS:  
            return {
                loading : false ,
                user : action.payload 
            }
        case USER_LOGOUT_SUCCESS: 
            return {
                loading : false ,
                user : null 
            }
        case USER_REGISTER_FAIL: 
            return {
                loading : false ,
                registerError : action.payload 
            }
        case USER_LOGOUT_FAIL:
            return {
                loading : false ,
                logoutError : action.payload
            }
        case USER_LOGIN_FAIL: 
            return {
                loading : false ,
                loginError : action.payload 
            }
        case CLEAR_ERRORS: 
            return {
                ...state ,
                registerError : null 
            }
        default:
            return state;
    }
}