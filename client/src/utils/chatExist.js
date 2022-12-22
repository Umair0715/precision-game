import axios from 'axios';


export const isChatExist = async ( userId , toast ) => {;
    try {
        const { data : { data : { chat } } } = await axios.post('/api/chat/single-chat' , { userId } , {
            headers : {
                'content-type' : 'application/json'
            }
        });
        if(chat){
            const { data : { data : { messages } } } = await axios.get(`/api/message/${chat?._id}`);
            if(messages?.length > 0){
                return true;
            }else {
                return false;
            }
        }else {
            return false ;
        }
    } catch (error) {
        console.log('chat Exist error' , error);
        toast.error(error?.response?.data?.message || 'something went wrong.');
    }
}