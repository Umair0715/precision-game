import {
    GET_CHATS_REQUEST ,
    GET_CHATS_SUCCESS ,
    GET_CHATS_FAIL ,
}
from '../constants/chatConstants';
import axios from 'axios';

export const fetchMyChats = (keyword=null, setMyChats=null) => async dispatch => {
    dispatch({ type : GET_CHATS_REQUEST });
    try {
        const { data : { data : { chats } } } = await axios.get(keyword ? `/api/chat?keyword=${keyword}` : '/api/chat');
        dispatch({ type : GET_CHATS_SUCCESS , payload : chats });
        setMyChats(chats);
    } catch (err) {
        dispatch({ type : GET_CHATS_FAIL , payload : err?.response?.data?.message || 'something went wrong.' })
    }
}