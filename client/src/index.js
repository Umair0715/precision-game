import './App.css';
import './utility.css';
import App from './App';
import ReactDOM from 'react-dom/client';
import React from 'react';
import "swiper/css";
import "swiper/css/pagination";
import AuthContextProvider from './context/authContext';
import SellerContextProvider from './context/sellerContext';
import BuyerContextProvider from './context/buyerContext';
import AdminContextProvider from './context/adminContext';
import ProductContextProvider from './context/productContext';
import { Provider } from 'react-redux';
import store from './redux/store';
import ChatContextProvider from './context/chatContext';
import PaymentContextProvider from './context/paymentContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <AuthContextProvider>
      <SellerContextProvider>
         <BuyerContextProvider>
            <AdminContextProvider>
               <ProductContextProvider>
                  <ChatContextProvider>
                     <PaymentContextProvider>
                        <Provider store={store}>
                           <App />
                        </Provider>
                     </PaymentContextProvider>
                  </ChatContextProvider>
               </ProductContextProvider>
            </AdminContextProvider>
         </BuyerContextProvider>
      </SellerContextProvider>
   </AuthContextProvider>
);


