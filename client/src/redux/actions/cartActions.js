import {
    ADD_TO_CART, 
    REMOVE_FROM_CART ,
 } 
 from '../constants/cartConstants';
 import axios from 'axios';
 
 
export const addToCart = ( id , qty , toast , navigate , setShowProductDetailsPopup ) => async ( dispatch, getState) => {
    try{
        const { data : { data : { product } } } = await axios.get(`/api/product/${id}`);
        navigate('/cart');
        if(product?.type === 2){
            dispatch({ type : ADD_TO_CART , payload : { ...product , qty , chat : false }});
        }else {
            dispatch({ type : ADD_TO_CART , payload : { ...product , qty , chat : true }});
        }
        localStorage.setItem('cartItems' , JSON.stringify(getState().cart.cartItems))
        toast.success('Item added to cart.');
        setShowProductDetailsPopup(false);
    }catch(err){
        console.log('From add to cart action' , err);
    }
}
 
 // REMOVE CART ITEM
export const removeFromCart = (id , toast)  => async ( dispatch, getState) => {
    try{
        dispatch({ type : REMOVE_FROM_CART , payload : id})
        localStorage.setItem('cartItems' , JSON.stringify(getState().cart.cartItems));
        toast.success('Item removed from cart.')
    }catch(err){
        console.log('From Remove From cart action' , err);
    }
}
 