import {
    GET_ORDERS_REQUEST ,
    GET_ORDERS_SUCCESS ,
    GET_ORDERS_FAIL 
}
from '../constants/orderConstants';
import axios from 'axios';


export const getMyOrders = (path='/' , pageNumber=1 , type = null) => async dispatch => {
    dispatch({ type : GET_ORDERS_REQUEST });
    try {
        const { data : { data : { orders , pages , currentPage , ordersCount } } } = await axios.get(`${type && type !==null ? `/api/order${path}?pageNumber=${pageNumber}&type=${type}` : `/api/order/${path}?pageNumber=${pageNumber}` }`);
        dispatch({ type : GET_ORDERS_SUCCESS , payload : {ordersList : orders , pages , currentPage , ordersCount }});
    } catch (err) {
        console.log('GetMyOrders Error' , err);
        dispatch({ type : GET_ORDERS_FAIL , payload : err?.response?.data?.message || 'Something went wrong.'})
    }
}


export const createOrder = async (orderData, toast) => {
    try {
        const { data : { data : { order } } } = await axios.post('/api/order' , orderData , {
            headers : {
                'content-type' : 'application/json'
            }
        });
        return order ;
    } catch (err) {
        console.log('create Order Error' , err);
        return toast.error(err?.response?.data?.message || err?.message || 'Something went wrong.')
    }
};

export const updateOrder = () => {
    JSON.parse(localStorage.getItem('currentOrders')).forEach( async item => {
        try {
            return await axios.put(`/api/order/${item?._id}` , { 
                isPaid : true ,
            } , {
                headers : {
                    'content-type' : 'application/json'
                }
            });
        } catch (error) {
            console.log('Update Order Error' ,error);
        }
    });
    localStorage.setItem('currentOrders' , JSON.stringify([]));
};






