import './styles.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams , useNavigate } from 'react-router-dom';
import BuyerNav from '../../components/buyer/navbar';
import Footer from '../../components/footer';
import { fetchMyChats } from '../../redux/actions/chatActions';
import { CLEAR_ERRORS } from '../../redux/constants/chatConstants';
import Chatbox from './Chatbox';
import Chats from './Chats'
import Header from './Header';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';


const Chat = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { chatsError , loading } = useSelector(state => state.chats); 
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth)
    const [myChats , setMyChats] = useState([]);


    useEffect(() => {
        if(!user){
            navigate('/?login=true')
        }else if(user?.role === 1 || user?.role === 3){
            return;
        }else {
            navigate(user?.role === 2 ?  '/seller' : '/?login=true' )
        }
    }, [user,navigate]);

    useEffect(() => {
        dispatch(fetchMyChats(null , setMyChats));
    }, [dispatch]);


    useEffect(() => {
        if(chatsError){
            toast.error(chatsError);
            dispatch({ type : CLEAR_ERRORS });
        }  
    }, [chatsError,dispatch]);


    useEffect(() => {
        if(id){
            const cartItems = JSON.parse(localStorage.getItem('cartItems')).map(item => {
                if(item?._id === id){
                    item.chat = true;
                    return item;
                }
                return item;
            })
            localStorage.setItem('cartItems' , JSON.stringify(cartItems));
        }
    }, [id])


    return (
        <div className='chat-wrapper'>
            <div className='lg:ml-[25%] pb-20'>
                <div className='md:py-10 pt-4 px-2'>
                    <BuyerNav />
                </div>
                {/* <div className='flex items-center gap-8 lg:px-0 px-2 my-10'>
                    <div>
                        <button className="btn-primary py-3 px-12"
                        onClick={() => handleClick(3)}>
                            REVIEW
                        </button>
                    </div>
                    <div className='text-secondary underline font-medium capitalize text-[17px] cursor-pointer hover:text-primary'
                    onClick={() => handleClick(2)}>
                        <p>Report Seller</p>
                    </div>
                    
                </div> */}
                <div className='bg-bgColor lg:mr-12 shadow-1 lg:rounded-md'>
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
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default Chat