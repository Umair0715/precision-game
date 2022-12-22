import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import ChatSupport from './pages/chatSupport';
import Sidebar from './components/sidebar';
import Buyer from './pages/buyer';
import BuyerPurchases from './pages/buyerPurchases';
import Cart from './pages/cart';
import Home from './pages/home';
import Seller from './pages/seller';
import Chat from './pages/chat'; 
import Subscribe from './pages/subscribe';
import { useBuyerContext } from './context/buyerContext';
import BuyerPopup from './components/buyer/popup';
import Dashboard from './pages/admin/dashboard';
import AllProducts from './pages/admin/allProducts';
import Buyers from './pages/admin/buyers';
import Sellers from './pages/admin/sellers';
import Orders from './pages/admin/orders';
import Drawer from './components/drawer';
import Settings from './pages/admin/settings';
import AdminPopup from './components/dashboard/popup';
import { useAdminContext } from './context/adminContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaymentSuccess from './pages/paymentSuccess';
import PaymentCancel from './pages/paymentCancel';
import ProtectedRoute from './ProtectedRoute';
import SupportChat from './pages/admin/supportChat';
import Packages from './pages/admin/packages';
import Games from './pages/admin/games';
import PrivacyPolicy from './pages/privacyPolicy';


function App() {
    const { showBuyerPopup } = useBuyerContext();
    const { showAdminPopup } = useAdminContext();
    

    return (
        <div className="App">
            <Router>
                <Sidebar />
                <Drawer /> 
                <ToastContainer 
                    style={{fontSize: 15}}
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar
                    closeOnClick
                    pauseOnHover
                />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                    <Route path='/seller' element={
                        <ProtectedRoute>
                            <Seller />
                        </ProtectedRoute>
                    } />
                    <Route path='/buyer' element={
                        <ProtectedRoute>
                            <Buyer />
                        </ProtectedRoute>
                    } />
                    <Route path='/buyer/purchase' element={
                        <ProtectedRoute>
                            <BuyerPurchases />
                        </ProtectedRoute>
                    } />
                    <Route path='/cart' element={
                        <ProtectedRoute>
                            <Cart />
                        </ProtectedRoute>
                    } />
                    <Route path='/chat-support' element={
                        <ProtectedRoute>
                            <ChatSupport />
                        </ProtectedRoute>
                    } />
                    <Route path='/chat' element={
                        <ProtectedRoute>
                            <Chat />
                        </ProtectedRoute>
                    } />
                     <Route path='/chat/:id' element={
                        <ProtectedRoute>
                            <Chat />
                        </ProtectedRoute>
                    } />
                    <Route path='/subscribe' element={<Subscribe />} />
                    <Route path='/admin/dashboard' element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } />
                    <Route path='/admin/products' element={
                        <ProtectedRoute>
                            <AllProducts />
                        </ProtectedRoute>
                    } />
                    <Route path='/admin/buyers' element={
                        <ProtectedRoute>
                            <Buyers />
                        </ProtectedRoute>
                    } />
                    <Route path='/admin/sellers' element={
                        <ProtectedRoute>
                            <Sellers />
                        </ProtectedRoute>
                    } />
                    <Route path='/admin/orders' element={
                        <ProtectedRoute>
                            <Orders />
                        </ProtectedRoute>
                    } />
                    <Route path='/admin/games' element={
                        <ProtectedRoute>
                            <Games />
                        </ProtectedRoute>
                    } />
                    <Route path='/admin/chat' element={
                        <ProtectedRoute>
                            <SupportChat />
                        </ProtectedRoute>
                    } />
                    <Route path='/admin/settings' element={
                        <ProtectedRoute>
                            <Settings />
                        </ProtectedRoute>
                    } />
                    <Route path='/admin/packages' element={
                        <ProtectedRoute>
                            <Packages />
                        </ProtectedRoute>
                    } />
                    <Route path='/home/:token' element={<Home />}/>
                    <Route path='/checkout-success' element={
                        <ProtectedRoute>
                            <PaymentSuccess />
                        </ProtectedRoute>
                    } />
                    <Route path='/checkout-cancel' element={
                        <ProtectedRoute>
                            <PaymentCancel />
                        </ProtectedRoute>
                    } />
                </Routes>
                {/* <Footer /> */}
            </Router>
            {
                showBuyerPopup && <BuyerPopup />
            }
            {
                showAdminPopup && <AdminPopup />
            }
            
        </div>
    );
}

export default App;
