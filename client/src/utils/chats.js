import axios from 'axios';

export const createChat = async (userId,isAdminChat=false) => {
    const { data : { data : { chat } } } = await axios.post('/api/chat' , { 
        userId , isAdminChat 
    } , {
        headers : {
            'content-type' : 'application/json'
        }
    });
    return chat ; 
}

export const deleteChat = async (chatId) => {
    const { data : { data : { message} } } = await axios.delete(`/api/chat/${chatId}`);
    return message;
}