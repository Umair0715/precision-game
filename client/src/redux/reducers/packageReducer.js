import { 
    GET_PACKAGES_REQUEST ,
    GET_PACKAGES_SUCCESS ,
    GET_PACKAGES_FAIL ,
    CLEAR_ERRORS
}
from '../constants/packageConstants';


export const packageReducer = (state = { packages : null } , action ) => {
    switch (action.type) {
        case GET_PACKAGES_REQUEST:
            return{
                loading : true 
            }
        case GET_PACKAGES_SUCCESS:
            return{
                loading : false,
                packages : action.payload 
            }
        case GET_PACKAGES_FAIL:
        return{
            loading : false ,
            error : action.payload 
        }
        case CLEAR_ERRORS:
        return{
            loading : false ,
            error : null  
        }
        default:
            return state;
    }
}