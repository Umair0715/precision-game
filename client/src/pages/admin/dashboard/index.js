import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/dashboard/sidebar';
import { useAdminContext } from '../../../context/adminContext';
import { checkAdmin } from '../../../utils/redirectTo';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import axios from 'axios';
import Transactions from '../../../components/transactions';
import WalletTabs from '../../../components/walletTabs';
import WithdrawRequests from '../../../components/withdrawRequests';

const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth)
    const { setShowAdminDrawer , showAdminDrawer } = useAdminContext();
    const [totalProducts , setTotalProducts] = useState(0);
    const [totalOrders , setTotalOrders] = useState(0); 
    const [adminWallet , setAdminWallet] = useState();
    const [loading , setLoading] = useState(false);
    const [activeTab , setActiveTab] = useState(1);

    useEffect(() => {
        checkAdmin(navigate,user);
    }, [user , navigate]);

    const fetchDashboardDetails = async () => {
        try {
            setLoading(true);
            const { data : { data : { ordersCount , productsCount , wallet } } } = await axios.get('/api/admin/dashboard');
            setTotalProducts(productsCount);
            setTotalOrders(ordersCount);
            setAdminWallet(wallet);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error(error?.response?.data?.message || 'something went wrong.')
        }
    }

    useEffect(() => {
        fetchDashboardDetails();
    }, []);


    return (
        <div className='w-full min-h-screen h-full flex'>
            <div className={`fixed top-0 md:left-0  duration-300 ease-in-out ${showAdminDrawer ? 'left-0' : '-left-full'} w-[250px] h-screen z-[999]`}>
                <Sidebar />
            </div>
            <div className='w-full bg-bgColor md:ml-[250px] sm:py-6 py-4 sm:px-4 px-2'>
                <div className='text-4xl text-primary flex items-center justify-between'>
                    <h3>Dashboard</h3>
                    <div className='md:hidden flex text-4xl text-secondary cursor-pointer'
                    onClick={() => setShowAdminDrawer(true)}>
                        <i className="uil uil-bars"></i>
                    </div>
                </div>
                <div className='w-full mt-12 flex items-center flex-wrap justify-between sm:px-8 gap-4'>
                    <div className='bg-gradient rounded-md py-3 px-4 w-full sm:w-[230px] text-center'>
                        <h5 className='text-2xl font-semibold'>Total Balance</h5>
                        {
                            loading 
                            ? 
                                <ClipLoader size={20} color='#000' />
                            : 
                                <p className='text-center mt-4 font-medium'>${adminWallet?.totalBalance?.toFixed(2)}</p>
                        }
                    </div>
                    <div className='bg-gradient rounded-md py-3 px-4 w-full sm:w-[230px] text-center'>
                        <h5 className='text-2xl font-semibold'>Total Earning</h5>
                        {
                            loading 
                            ? 
                                <ClipLoader size={20} color='#000' />
                            : 
                                <p className='text-center mt-4 font-medium'>${adminWallet?.earning?.toFixed(2)}</p>
                        }
                    </div>
                    <div className='bg-gradient rounded-md py-3 px-4 w-full sm:w-[230px] text-center'>
                        <h5 className='text-2xl font-semibold'>Total Products</h5>
                        {
                            loading 
                            ? 
                                <ClipLoader size={20} color='#000' />
                            : 
                                <p className='text-center mt-4 font-medium'>{totalProducts}</p>
                        }
                    </div>
                    <div className='bg-gradient rounded-md py-3 px-4 w-full sm:w-[230px] text-center'>
                        <h5 className='text-2xl font-semibold'>Orders</h5>
                        {
                            loading 
                            ? 
                                <ClipLoader size={20} color='#000' />
                            : 
                                <p className='text-center mt-4 font-medium'>{totalOrders}</p>
                        }
                    </div>
                   
                    
                </div>
                <div className='mt-12'>
                    <WalletTabs activeTab={activeTab} setActiveTab={setActiveTab}  />
                </div>
                <div className='mt-8'>
                    {
                        activeTab === 1 
                        ? 
                            <Transactions />
                        : 
                            <WithdrawRequests />
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard;