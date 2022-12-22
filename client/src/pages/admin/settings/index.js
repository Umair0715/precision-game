/* eslint-disable */
import Sidebar from '../../../components/dashboard/sidebar'
import { useAdminContext } from '../../../context/adminContext';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { checkAdmin } from "../../../utils/redirectTo";
import axios from 'axios';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const Settings = () => {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth)
    const { setShowAdminPopup , setAdminActivePopup , showAdminDrawer , setShowAdminDrawer , adminCurrentProfit , setAdminCurrentProfit } = useAdminContext();
    const [loading ,setLoading] = useState(false);
    
    const handleClick = (val) => {
        setShowAdminPopup(true);
        setAdminActivePopup(val);
    }
    
    useEffect(() => {
        checkAdmin(navigate , user);
    }, [user, navigate]);

    const fetchAdminProfit = async () => {
        setLoading(true);
        try {
            const { data : { data : { profit } } } = await axios.get('/api/adminProfit');
            setAdminCurrentProfit(profit);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log('get Admin Profit error' , error);
            toast.error(error?.response?.data?.message || 'something went wrong.')
        }
    }

    useEffect(() => {
        fetchAdminProfit();
    }, []);


    return (
        <div className='w-full min-h-screen h-full flex'>
             <div className={`fixed top-0 md:left-0  duration-300 ease-in-out ${showAdminDrawer ? 'left-0' : '-left-full'} w-[250px] h-screen z-[999]`}>
                <Sidebar />
            </div>
            <div className='w-full bg-bgColor md:ml-[250px] py-6 px-4'>
                <div className='text-4xl text-primary flex items-center justify-between sm:px-0 px-2'>
                    <h3>Settings</h3>
                    <div className='md:hidden flex text-4xl text-secondary cursor-pointer'
                    onClick={() => setShowAdminDrawer(true)}>
                        <i className="uil uil-bars"></i>
                    </div>
                </div>
                <div className='grid md:grid-cols-2 grid-cols-1  gap-6 mt-8'>
                    <div className='bg-gradient rounded-md w-full flex justify-between py-2 px-4'>
                        <div className=''>
                            <h5 className='text-2xl font-semibold'>Admin Profit</h5>
                            <p className='text-[17px]'>
                                { 
                                    loading 
                                    ? 
                                        <ClipLoader size={20} /> 
                                    : 
                                        adminCurrentProfit?.profit 
                                } 
                            </p>
                        </div>
                        <div className='underline cursor-pointer font-medium'
                        onClick={() => handleClick(1)}>
                            Change Profit
                        </div>
                    </div>
                    <div className='bg-gradient rounded-md w-full flex justify-between py-2 px-4'>
                        <div className=''>
                            <h5 className='text-2xl font-semibold'>{user?.name} </h5>
                            <p className='text-[17px]'>email: {user?.email}</p>
                        </div>
                        <div className='underline cursor-pointer font-medium'
                        onClick={() => handleClick(2)}>
                            Change Password
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings;