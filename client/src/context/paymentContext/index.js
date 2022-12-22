import { useContext , createContext , useState } from 'react';


const PaymentContext = createContext();

export const usePaymentContext = () => useContext(PaymentContext);


const PaymentContextProvider = ({ children }) => {
    const [currentPayment , setCurrentPayment] = useState(null);
    const [showUpdatePaymentPopup , setShowUpdatePaymentPopup] = useState(false);
    const [showPaymentProofPopup , setShowPaymentProofPopup] = useState(false);

    return (
        <PaymentContext.Provider value={{ 
            currentPayment , setCurrentPayment ,
            showPaymentProofPopup , setShowPaymentProofPopup ,
            showUpdatePaymentPopup , setShowUpdatePaymentPopup
        }}>
            {children}
        </PaymentContext.Provider>
    )
}

export default PaymentContextProvider;
