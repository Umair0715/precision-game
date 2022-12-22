import { createContext , useContext , useState } from 'react';

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);


const AuthContextProvider = ({ children }) => {
    const [showAuthPopup , setShowAuthPopup] = useState(false);
    const [currentAuthPopup , setCurrentAuthPopup] = useState(''); 
    // 1 = login , 2 = register , 3 = forgot , 4 = newPassword
    const [userData , setUserData] = useState({});
    
    //for drawer 
    const [showDrawer , setShowDrawer] = useState(false);
    

    return (
        <AuthContext.Provider value={{
            showAuthPopup , setShowAuthPopup ,
            currentAuthPopup , setCurrentAuthPopup ,
            showDrawer , setShowDrawer ,
            userData , setUserData 
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;