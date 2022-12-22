import './styles.css';
import Chatbox from './Chatbox'
import Header from './Header'
import BuyerNav from '../../components/buyer/navbar';
import Footer from '../../components/footer';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { createChat } from '../../utils/chats';
import { ClipLoader } from 'react-spinners';



const ChatSupport = () => {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
    const [adminChat , setAdminChat] = useState();
    const [admin , setAdmin] = useState();
    const [loading , setLoading] = useState(false);

    useEffect(() => {
        if(!user){
            navigate('/?login=true')
        }else if(user?.role !== 1){
            navigate(user?.role === 2 ? '/seller' : user?.role === 3 ? '/admin/dashboard' : '/?login=true' )
        }
    }, [user , navigate]);

    const getChatDetails = async () => {
        try {
            setLoading(true);
            const { data : { data : { admin : _admin } } } = await axios.get('/api/user/admin');
            const chat =  await createChat(_admin?._id , true);
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
        <div className='chatsupport-wrapper h-screen '>
            <div className='lg:ml-[25%] pb-20'>
                <div className='md:py-10 pt-4 lg:px-0 md:px-4 px-2'>
                    <BuyerNav />
                </div>
               
                <div className='bg-bgColor lg:mr-12 mt-10 shadow-1 lg:rounded-md'>
                    <Header />
                    {
                        loading 
                        ? 
                            <div className='w-full h-full flex items-center justify-center py-12'>
                                <ClipLoader size={20} color='#fff' />
                            </div>
                        : 
                            <div className='w-full flex gap-[1px]'>
                                <div className='w-full'>
                                    <Chatbox 
                                    adminChat={adminChat} 
                                    admin={admin} 
                                    />
                                </div>
                            </div>
                    }
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default ChatSupport