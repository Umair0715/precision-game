import { createStore , applyMiddleware , combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducer } from './reducers/authReducer';
import { productReducer } from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';
import { ordersReducer } from './reducers/ordersReducer';
import { chatReducer } from './reducers/chatReducer';
import { messageReducer } from './reducers/messageReducer';
import { packageReducer } from './reducers/packageReducer';

const reducers = combineReducers({
    auth : authReducer ,
    products : productReducer ,
    cart : cartReducer ,
    orders : ordersReducer ,
    chats : chatReducer , 
    messages : messageReducer ,
    packages : packageReducer
});

const initialState = {
    auth : {
        user : localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    } ,
    cart : {
        cartItems : localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [] 
    }
}

const store = createStore(reducers , initialState , composeWithDevTools(applyMiddleware(thunk)));

export default store;