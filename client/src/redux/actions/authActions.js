import {
    USER_REGISTER_REQUEST ,
    USER_REGISTER_SUCCESS ,
    USER_REGISTER_FAIL ,
    USER_LOGIN_REQUEST ,
    USER_LOGIN_SUCCESS ,
    USER_LOGIN_FAIL, 
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAIL,
} from '../constants/authConstants';
import axios from 'axios';

export const register = (userData , navigate , setShowAuthPopup , toast) => async dispatch => {
    dispatch({ type : USER_REGISTER_REQUEST });
    try {
        const { data : { data : { user , token } } } = await axios.post('/api/auth/register' , userData , {
            headers : {
                "Content-Type" : "Application/json"
            }
        });
        user.token = token;
        dispatch({ type : USER_REGISTER_SUCCESS , payload : user });
        localStorage.setItem('user' , JSON.stringify(user));
        setShowAuthPopup(false);
        navigate(user?.role === 1 ? '/buyer' : user?.role === 2 ? '/seller' : user?.role === 3 ? '/admin/dashboard' : '/');
        toast.success('Registered successfully.')
    } catch (err) {
        console.log('Register action error' , err);
        dispatch({ type : USER_REGISTER_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message || 'something went wrong.'})
    }
}


export const login = ( userData , navigate , toast , setShowAuthPopup ) => async dispatch =>  {
    dispatch({ type : USER_LOGIN_REQUEST });
    try {
        const { data : { data : { user , token } } } = await axios.post('/api/auth/login' , userData , {
            headers : {
                "Content-Type" : "application/json"
            }
        });
        user.token = token;
        localStorage.setItem('user' , JSON.stringify(user));
        dispatch({ type : USER_LOGIN_SUCCESS , payload : user });
        setShowAuthPopup(false);
        navigate(user?.role === 1 ? '/buyer' : user?.role === 2 ? '/seller' : user?.role === 3 ? '/admin/dashboard' : '/');
        toast.success('Loged in successfully.');
    } catch (err) {
        console.log('Login action error' , err);
        dispatch({ type : USER_LOGIN_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message || 'something went wrong.'})
    }
};


export const logout = (navigate) => async dispatch =>  {
    try {
        dispatch({ type : USER_LOGOUT_REQUEST })
        await axios.get('/api/auth/logout');
        dispatch({ type : USER_LOGOUT_SUCCESS });
        localStorage.setItem('user' , null);
        navigate('/?login=true')
    } catch (err) {
        dispatch({ type : USER_LOGOUT_FAIL , payload : err?.response?.data?.message || 'something went wrong.'})
    }
}

