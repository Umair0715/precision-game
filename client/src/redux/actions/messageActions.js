import {
    GET_MESSAGES_REQUEST ,
    GET_MESSAGES_SUCCESS ,
    GET_MESSAGES_FAIL ,
}
from '../constants/messageConstants';
import axios from 'axios';

export const fetchChatMessages = (chatId, setChatMessages) => async dispatch => {
    dispatch({ type : GET_MESSAGES_REQUEST });
    try {
        const { data : { data : { messages } } } = await axios.get(`/api/message/${chatId}`);
        dispatch({ type : GET_MESSAGES_SUCCESS , payload : messages });
        setChatMessages(messages);
    } catch (err) {
        dispatch({ type : GET_MESSAGES_FAIL , payload : err?.response?.data?.message || 'something went wrong.' })
    }
}