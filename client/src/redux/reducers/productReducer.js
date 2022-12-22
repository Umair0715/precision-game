import {
    GET_PRODUCTS_REQUEST ,
    GET_PRODUCTS_SUCCESS ,
    GET_PRODUCTS_FAIL , 
    CLEAR_ERRORS
}
from '../constants/productConstants';


export const productReducer = (state = { products : null } , action) => {
    switch (action.type) {
        case GET_PRODUCTS_REQUEST:
            return {
                loading : true 
            }
        case GET_PRODUCTS_SUCCESS:
            return {
                loading : false ,
                products : action.payload 
            }
        case GET_PRODUCTS_FAIL: 
            return {
                loading : false ,
                error : action.payload 
            }
        case CLEAR_ERRORS: 
            return {
                ...state ,
                error : null 
            }
        default:
            return state;
    }
}