import { useContext , createContext , useState } from 'react';

const SellerContext = createContext();

export const useSellerContext = () => useContext(SellerContext);

const SellerContextProvider = ({ children }) => {
    const [sellerActiveTab , setSellerActiveTab] = useState(1);
    const [showAddItemPopup , setShowAddItemPopup] = useState(false);
    const [showWithdrawPopup , setShowWithdrawPopup] = useState(false);
    const [addItemActiveTab , setAddItemActiveTab] = useState(1); // 1 = product , 2 = service , 3 = accounts

    return (
        <SellerContext.Provider value={{
            sellerActiveTab , setSellerActiveTab ,
            showAddItemPopup , setShowAddItemPopup ,
            addItemActiveTab , setAddItemActiveTab , 
            showWithdrawPopup , setShowWithdrawPopup
        }}>
            {children}
        </SellerContext.Provider>
    )
}

export default SellerContextProvider;