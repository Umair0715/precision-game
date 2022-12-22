import { useContext , createContext , useState } from 'react';

const BuyerContext = createContext();

export const useBuyerContext = () => useContext(BuyerContext);

const BuyerContextProvider = ({ children }) => {
    const [showBuyerPopup , setShowBuyerPopup] = useState(false);
    const [buyerActivePopup , setBuyerActivePopup] = useState(0);
    // 1 = 'purchase' , 2 = 'report' , 3='feedback'
    const [showDrawer,setShowDrawer] = useState(false);
    
    return (
        <BuyerContext.Provider value={{
            showBuyerPopup , setShowBuyerPopup ,
            buyerActivePopup , setBuyerActivePopup ,
            showDrawer , setShowDrawer , 
          
        }}>
            {children}
        </BuyerContext.Provider>
    )
}

export default BuyerContextProvider;