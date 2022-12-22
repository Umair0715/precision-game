import {
    GET_ORDERS_REQUEST ,
    GET_ORDERS_SUCCESS ,
    GET_ORDERS_FAIL ,
    CLEAR_ERRORS
}
from '../constants/orderConstants';


export const ordersReducer = (state = { } , action) => {
    switch (action.type) {
        case GET_ORDERS_REQUEST:    
            return {
                loading : true 
            }
        case GET_ORDERS_SUCCESS: 
            return {
                loading : false ,
                ordersList : action.payload.ordersList , 
                pages : action.payload.pages ,
                currentPage : action.payload.currentPage ,
                ordersCount : action.payload.ordersCount 
            }
        case GET_ORDERS_FAIL :
            return {
                loading : false ,
                ordersError : action.payload
            }
        case CLEAR_ERRORS : {
            return {
                loading : false ,
                ordersError : null 
            }
        }
        default:
            return state ;
    }
}