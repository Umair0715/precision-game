import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { createChat } from '../../../utils/chats';
import Chatbox from './Chatbox'
import Header from './Header'

const ChatSupport = () => {
    const [adminChat , setAdminChat] = useState();
    const [admin , setAdmin] = useState();
    const [loading , setLoading] = useState(false);


    const getChatDetails = async () => {
        try {
            setLoading(true);
            const { data : { data : { admin : _admin } } } = await axios.get('/api/user/admin');
            const chat =  await createChat(_admin?._id,true);
            setAdminChat(chat);
            setAdmin(_admin);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error(error?.response?.data?.message || 'something went wrong.');
        }
    }

    useEffect(() => {
        getChatDetails(); 
    }, []);

    return (
        <div>
            <Header />
            <div className='w-full flex gap-[1px]'>
                {
                    loading 
                    ? 
                        <div className='w-full h-full flex items-center justify-center py-12'>
                            <ClipLoader size={20} color='#fff' />
                        </div>
                    : 
                    <div className='w-full'>
                        <Chatbox 
                        adminChat={adminChat} 
                        admin={admin}
                        />
                    </div>
                }
            </div>
        </div>
    )
}

export default ChatSupport