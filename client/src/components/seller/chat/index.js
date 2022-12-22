import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { fetchMyChats } from '../../../redux/actions/chatActions';
import { CLEAR_ERRORS } from '../../../redux/constants/chatConstants';
import Chatbox from './Chatbox';
import Chats from './Chats'
import Header from './Header'
import './styles.css';

const Chat = () => {
    const dispatch = useDispatch();
    const { chatsError , loading } = useSelector(state => state.chats); 
    const [myChats , setMyChats] = useState([]);



    useEffect(() => {
        dispatch(fetchMyChats(null , setMyChats));
    }, [dispatch]);

   

    useEffect(() => {
        if(chatsError){
            toast.error(chatsError);
            dispatch({ type : CLEAR_ERRORS });
        }  
    }, [chatsError , dispatch ]);


    return (
        <div>
            <Header myChats={myChats} setMyChats={setMyChats} />
            <div className='w-full flex gap-[1px]'>
                <div className='sm:flex-[0.35] '>
                    {
                        loading 
                        ? 
                            <div className='w-full h-full flex items-center justify-center py-12'>
                                <ClipLoader size={20} color='#fff' />
                            </div> 
                        : 
                        myChats?.filter(c => !c.isAdminChat)?.length > 0
                        ? 
                            <Chats chats={myChats} />
                        : 
                            <div className='w-full h-full flex items-center justify-center text-2xl font-medium text-gray-400 py-12'>
                                <p>No Chat Found.</p>
                            </div>
                    }
                </div>
                <div className='sm:flex-[0.65] w-full'>
                    <Chatbox myChats={myChats} setMyChats={setMyChats} />
                </div>
            </div>
        </div>
    )
}

export default Chat