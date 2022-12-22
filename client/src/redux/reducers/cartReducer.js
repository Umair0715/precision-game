import {
    ADD_TO_CART ,
    REMOVE_FROM_CART ,
    RESET_CART_ITEMS
 }
 from '../constants/cartConstants';
 
 
 export const cartReducer = (state={ cartItems : [] , shippingInfo : {}} , action ) => {
    switch (action.type) {
       case ADD_TO_CART : 
          const item = action.payload;
          const itemExist = state.cartItems?.find(x => x._id === item._id);
          if(itemExist){
             return {
                ...state ,
                cartItems : state.cartItems?.map(x => x._is === itemExist._id ? item : x)
             }
          }else{
             return {
                ...state ,
                cartItems : [...state.cartItems , item ]
             }
          }
       case REMOVE_FROM_CART:
          return {
             ...state ,
             cartItems : state.cartItems.filter(x => x._id !== action.payload)
          }
       case RESET_CART_ITEMS:
          return {
             ...state ,
             cartItems : [] ,
             
          }
       default: return state ;
    }
 
 }