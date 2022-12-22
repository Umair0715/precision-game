import { useContext , createContext , useState } from 'react';


const AdminContext = createContext();

export const useAdminContext = () => useContext(AdminContext);

const AdminContextProvider = ({ children }) => {
    const [showAdminPopup , setShowAdminPopup] = useState(false);
    const [adminActivePopup , setAdminActivePopup] = useState(0);
    const [showAdminDrawer , setShowAdminDrawer] = useState(false);
    // 1 = 'change profit' , 2 = 'change Password'
    const [adminCurrentProfit , setAdminCurrentProfit] = useState({});
    const [packages , setPackages] = useState([]);
    const [games , setGames] = useState([]);

    return (
        <AdminContext.Provider value={{
            showAdminPopup , setShowAdminPopup ,
            adminActivePopup , setAdminActivePopup ,
            showAdminDrawer , setShowAdminDrawer ,
            adminCurrentProfit , setAdminCurrentProfit ,
            packages , setPackages ,
            games , setGames
        }}>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;