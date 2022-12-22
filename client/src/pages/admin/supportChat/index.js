import Sidebar from '../../../components/dashboard/sidebar';
import { useAdminContext } from '../../../context/adminContext';
import Chatbox from './Chatbox';
import Chats from './Chats'
import Header from './Header'
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { checkAdmin } from "../../../utils/redirectTo";
import { fetchMyChats } from '../../../redux/actions/chatActions';
import { ClipLoader } from 'react-spinners';


const SupportChat = () => {
    const { showAdminDrawer , setShowAdminDrawer } = useAdminContext();


    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.chats); 
    const [myChats , setMyChats] = useState([]);



    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        checkAdmin(navigate , user);
    }, [user , navigate]);

    useEffect(() => {
        dispatch(fetchMyChats(null , setMyChats));
    }, [dispatch]);

    return (
        <div className='w-full min-h-screen h-full flex'>
            <div className={`fixed top-0 md:left-0  duration-300 ease-in-out ${showAdminDrawer ? 'left-0' : '-left-full'} w-[250px] h-screen z-[999]`}>
                <Sidebar />
            </div>
            <div className='w-full bg-bgColor md:ml-[250px] py-6 px-4'>
                <div className='text-4xl text-primary flex items-center justify-between sm:px-0 px-2'>
                    <h3>All Chats</h3>
                    <div className='md:hidden flex text-4xl text-secondary cursor-pointer'
                    onClick={() => setShowAdminDrawer(true)}>
                        <i className="uil uil-bars"></i>
                    </div>
                </div>
                <div className='bg-bgColor shadow-1 mt-8'>
                    <Header myChats={myChats} setMyChats={setMyChats}/>
                    <div className='w-full flex gap-[1px]'>
                        <div className='sm:flex-[0.35] '>
                            {
                                loading 
                                ? 
                                    <div className='w-full h-full flex items-center justify-center py-12'>
                                        <ClipLoader size={20} color='#fff' />
                                    </div> 
                                : 
                                myChats?.length > 0
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
        </div>
    )
}

export default SupportChat;