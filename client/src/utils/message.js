import axios from 'axios';

export const sendMessage = async (messageData) => {
    const { data : { data : { message } } } = await axios.post('/api/message' , messageData , {
        headers : {
            'content-type' : 'application/json'
        }
    });
    return message;
}