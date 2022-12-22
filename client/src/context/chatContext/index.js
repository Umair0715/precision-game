import { useContext , createContext , useState } from 'react';

const ChatContext = createContext();

export const useChatContext = () => useContext(ChatContext);

const ChatContextProvider = ({ children }) => {
    const [chats , setChats ] = useState([]);
    const [selectedChat , setSelectedChat] = useState();
    const [notifications , setNotifications] = useState([]);

    return (
        <ChatContext.Provider value={{
            chats , setChats ,
            selectedChat , setSelectedChat ,
            notifications , setNotifications 
        }}
        >
            {children}
        </ChatContext.Provider>
    )
};

export default ChatContextProvider;