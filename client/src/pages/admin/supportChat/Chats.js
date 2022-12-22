import React from 'react'
import { useSelector } from 'react-redux';
import { useChatContext } from '../../../context/chatContext';
import moment from 'moment';

const avatar = 'https://gitlab.com/uploads/-/system/user/avatar/56386/tt_avatar_small.jpg';

const Chats = ({ chats }) => {
    const { user } = useSelector(state => state.auth);
    const { selectedChat , setSelectedChat , notifications , setNotifications } = useChatContext();

    const chatClickHandler = (chat) => {
        setSelectedChat(chat);
        setNotifications(notifications?.filter(n => n?.chat?._id !== chat?._id))
    }

    return (
        <div className='w-full border-r border-r-primary'>
            <div className='bg-primary pt-2 sm:px-4 px-2 pb-8 text-black rounded-bl-lg rounded-br-lg font-semibold '>
                Chats 
            </div>
            <div className='w-full h-[450px] chatsScroll overflow-auto py-3'>
               {
                    chats?.map(chat => (
                        <div className={`flex justify-between  py-2 sm:px-4 px-2 cursor-pointer mt-[1px]
                        ${
                            selectedChat?._id === chat?._id 
                            ? 'bg-primaryLight text-primaryLight' 
                            : 'hover:bg-yellow-300 text-primaryLight hover:text-black'
                        } `
                        }
                        onClick={() => chatClickHandler(chat)}
                        key={chat?._id}
                        >
                            <div className='flex gap-2'>
                                <div className='sm:w-[50px] sm:h-[50px] w-[40px] h-[40px] relative'>
                                    <img src={avatar} alt="avatar" className='w-full h-full rounded-full object-cover' />
                                    <div className='absolute bottom-2 right-0 w-[10px] h-[10px] bg-green-500 rounded-full border border-primaryLight'></div>
                                </div>
                                <div className='sm:block hidden'>
                                    <h5 className='text-secondary capitalize'>
                                        {chat?.users?.find(u => u._id !== user._id).name}
                                    </h5>
                                    <p className={`${selectedChat?._id === chat?._id ? 'text-black' : 'text-primaryLight'} text-sm`}>{
                                    chat?.latestMessage?.message?.length > 20 
                                    ? 
                                    `${chat?.latestMessage?.message.slice(0,20)}...` 
                                    : 
                                    chat?.latestMessage?.message 
                                    }</p>
                                </div>
                            </div>
                            <div className='sm:flex hidden flex-col gap-1'>
                                <p className='text-sm'>{chat?.latestMessage ? moment(chat?.latestMessage?.createdAt).format('hh:mm a') : ''}</p>
                                {
                                    notifications?.filter(n => n?.chat?._id === chat?._id).length > 0 
                                    ? 
                                    <div className='flex justify-end'>
                                        <div className='w-[15px] h-[15px] rounded-full flex items-center justify-center bg-green-500 text-white text-xs'>
                                            {notifications?.filter(n => n?.chat?._id === chat?._id).length}
                                        </div>
                                    </div>

                                    : 
                                        ''
                                }
                            </div>
                        </div>
                    ))
               }
            </div>
        </div>
    )
}

export default Chats