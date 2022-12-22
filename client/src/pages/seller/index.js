import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/footer';
import AddItemPopup from '../../components/seller/addItemPopup';
import Chat from '../../components/seller/chat';
import ChatSupport from '../../components/seller/chatSupport';
import Listings from '../../components/seller/listings';
import Orders from '../../components/seller/orders';
import Tabs from '../../components/seller/tabs';
import Wallet from '../../components/seller/wallet';
import WithdrawPopup from '../../components/seller/withdrawPopup';
import { useSellerContext } from '../../context/sellerContext';
import { logout } from '../../redux/actions/authActions';
import { redirectTo } from '../../utils/redirectTo';
import './styles.css';


const Seller = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth)
    const { sellerActiveTab , showAddItemPopup , showWithdrawPopup } = useSellerContext();

    useEffect(() => {
        redirectTo(navigate , user);
    }, [user, navigate]);

    const logoutHandler = () => {
        dispatch(logout(navigate));
    }

    return (
        <div className='seller-wrapper relative'>
            <div className='w-full lg:py-12 pt-12 flex items-center justify-between'>
                <h1 className='lg:ml-[25%] ml-4 font-bold text-[2.7rem] text-primary'>Hi <span className='text-secondary'>Seller,</span></h1>
                <p className='text-primary lg:hidden flex font-medium uppercase sm:mr-4 mr-2 cursor-pointer underline'
                onClick={logoutHandler}>
                    Logout
                </p>
            </div>
            <div className='w-full flex lg:flex-row flex-col justify-between pt-4 pb-20 lg:pl-8  lg:pr-12 sm:px-4 gap-12'>
                <div className='flex-[0.25] lg:mt-20 mt-12'>
                    <Tabs />
                </div>
                <div className='flex-[0.75] bg-bgColor sm:rounded-lg shadow-1 relative overflow-x-auto '>
                    {
                        sellerActiveTab === 1 
                        ? 
                            <Listings />
                        : 
                        sellerActiveTab === 2 
                        ? 
                            <Orders />
                        : 
                        sellerActiveTab === 3 
                        ? 
                            <Chat />
                        : 
                        sellerActiveTab === 4 
                        ? 
                            <ChatSupport />
                        : 
                        sellerActiveTab === 5 
                        ? 
                            <Wallet />
                        : 
                            ''
                    }
                </div>
            </div>
            {
                showAddItemPopup && <AddItemPopup />
            }
            {
                showWithdrawPopup && <WithdrawPopup />
            }
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default Seller