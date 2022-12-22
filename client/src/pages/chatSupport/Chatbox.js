import { useEffect , useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import { fetchChatMessages } from "../../redux/actions/messageActions";
import ScrollableFeed from 'react-scrollable-feed';
import moment from 'moment';
import { sendMessage } from "../../utils/message";
import { toast } from "react-toastify";
import io from 'socket.io-client';
import Lottie from 'react-lottie';
import animationData from "../../animations/typing.json";

const avatar = 'https://gitlab.com/uploads/-/system/user/avatar/56386/tt_avatar_small.jpg';


const ENDPOINT = 'https://game.shopziaa.com';

var socket , selectedChatCompare;

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
};

const Chatbox = ({adminChat,admin}) => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const [chatMessages , setChatMessages] = useState([]);
    const [newMessage , setNewMessage] = useState('');
    const [socketConnected , setSocketConnected] = useState(false);
    const [typing , setTyping] = useState(false);
    const [isTyping , setIsTyping] = useState(false);

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit('setup' , user);
        socket.on('connected' , () => setSocketConnected(true));
        socket.on('typing' , () => setIsTyping(true));
        socket.on('stop typing' , () => setIsTyping(false));
    } , [user]);

    useEffect(() => {
        dispatch(fetchChatMessages(adminChat?._id,setChatMessages));
        socket.emit('join chat' , adminChat?._id);
        selectedChatCompare = adminChat;
    }, [adminChat , dispatch])


    useEffect(() => {
        socket.on('message recieved' , (messageRecived) => {
            if(!selectedChatCompare || selectedChatCompare._id !== messageRecived?.chat?._id ){
                //give notification
                // if(!notifications?.includes(messageRecived)){
                //     setNotifications([messageRecived , ...notifications])
                // }
            }else {
                setChatMessages([...chatMessages , messageRecived]);
            }
        })
    });

    const sendMessageHandler = async (e) => {
        e.preventDefault();
        const messageData = {
            chatId : adminChat?._id ,
            message : newMessage 
        }
        setNewMessage('');
        try {
            const message = await sendMessage(messageData);
            socket.emit('new message' , message);
            setChatMessages([...chatMessages , message]);
        } catch (error) {
            console.log('send message error');
            toast.error(error?.response?.data?.message || 'something went wrong.');
        }
    }

    const changeMessageHander = e => {
        setNewMessage(e.target.value);

        if(!socketConnected) return ;
        if(!typing){
            setTyping(true);
            socket.emit('typing' , adminChat?._id);
        }

        const lastTypingTime = new Date().getTime();
        const timerLength  = 3000; 
        setTimeout(() => {
            const timeNow = new Date().getTime();
            const timeDiff = timeNow - lastTypingTime;

            if(timeDiff >= timerLength && typing){
                socket.emit('stop typing' , adminChat?._id );
                setTyping(false);
            }
        } , [timerLength]);
    }

    return (
        <div className='w-full h-[500px] '>
            <div className='chatbox-header  flex items-center justify-between w-full py-4 pl-4 pr-2 bg-gradient text-black rounded-tr-[20px] rounded-bl-[20px]'>
                <div className='flex items-center gap-2'>
                    <div className='w-[50px] h-[50px] '>
                        <img src={avatar} alt="Avatar" className='w-full h-full rounded-lg object-cover'/>
                    </div>
                    <div className='flex flex-col gap-1 text-green-500'>
                        <h5 className='text-black font-semibold '>{admin?.name}</h5>
                        <div className='flex items-center gap-1'>
                            <div className='w-[10px] h-[10px] rounded-full bg-green-500 '></div>
                            <span className='text-xs'>online</span>
                        </div>
                    </div>
                </div>
                {/* <div className='flex items-center gap-2 text-xl'>
                    <div>
                        <i className="uil uil-trash"></i>
                    </div>
                </div> */}
            </div>
            <div className='messages-container  w-full h-[415px] flex flex-col justify-between pt-4 pb-2 px-2  '>
                <ScrollableFeed className="flex-[0.85] h-full flex flex-col gap-4 chatsScroll pb-2 pr-2">
                    {
                        chatMessages?.length > 0
                        ? 
                            chatMessages?.map(message => (
                                <div key={message?._id} className={`w-full flex ${message?.sender?._id === user?._id ? 'justify-start' : 'justify-end'}`}>
                                    <div className='flex gap-2'>
                                        {
                                            message?.sender?._id === user?._id && 
                                            <div className='sm:w-[40px] w-[30px] sm:h-[40px] h-[30px] '>
                                            <img src={avatar} alt="avatar" className='w-full h-full object-cover rounded-full'/>    
                                            </div>
                                        }      
                                        <div 
                                        className='rounded-lg rounded-tl-none bg-primaryLight py-2 sm:px-3 px-2 flex flex-col gap-1 items-start text-black sm:text-sm text-[10px] w-fit lg:max-w-[350px] max-w-[270px]  h-full break-word'
                                        >
                                            <p>{message?.message}</p>
                                            <span className='text-xs text-gray-400 '>{moment(message?.createdAt).format('h:mm a')}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        : 
                            <div className='w-full h-full flex items-center justify-center text-gray-400 font-semibold text-3xl' >
                                No Message Found.
                            </div>

                    } 
                </ScrollableFeed>
                {
                    isTyping ? (
                        <div>
                            <Lottie
                                options={defaultOptions}
                                // height={50}
                                width={70}
                                style={{ marginBottom: 15, marginLeft: 0 }}
                            />
                        </div>
                    ) : ''
                }
                <div className=' w-full flex-[0.15] flex items-center '>
                    {/* <div>
                        <img src="/svgs/file.svg" alt="File select" />
                    </div> */}
                    <div className='w-full sm:pr-4'>
                        <form 
                        className='flex items-center gap-2' 
                        onSubmit={sendMessageHandler}
                        >
                            <input 
                            type="text" 
                            placeholder='Type your message here..'
                            className='w-full py-2 px-4 rounded-lg bg-primaryLight border-none outline-none'
                            value={newMessage}
                            onChange={changeMessageHander}
                            required
                            />
                            <button 
                            type="submit" 
                            className='btn-primary py-2 sm:px-6 px-4'
                            >
                                SEND
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Chatbox