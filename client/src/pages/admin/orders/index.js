import React, { useState } from 'react'
import Table from './Table'
import Pagination from './Pagination'
import Sidebar from '../../../components/dashboard/sidebar'
import { useAdminContext } from '../../../context/adminContext'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { checkAdmin } from "../../../utils/redirectTo";
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import axios from 'axios'

// const avatar = 'https://gitlab.com/uploads/-/system/user/avatar/56386/tt_avatar_small.jpg';

const tabs = [
    {
        id : '1' ,
        name : 'View All' ,
        type : null
    } ,
    {
        id : '2' ,
        name : 'Products' ,
        type : 1 
    } ,
    {
        id : '3' ,
        name : 'Services' ,
        type : 2 
    } ,
    {
        id : '4' ,
        name : 'Accounts' ,
        type : 3 
    } ,
]

const Orders = () => {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth)
    const {showAdminDrawer , setShowAdminDrawer} = useAdminContext();
    const [activeTab , setActiveTab] = useState('1');
    const [allOrders , setAllOrders] = useState([]);
    const [pages , setPages] = useState(1);
    const [currentPage , setCurrentPage] = useState(1);
    const [productType , setProductType] = useState(null);
    const [loading ,setLoading] = useState(false);

    useEffect(() => {
        checkAdmin(navigate , user);
    }, [user, navigate]);

    const fetchOrders = async (page = 1 , type = null ) => {
        try {
            const { data : { data : { orders , pages : _pages , currentPage : _currentPage  } } } = await axios.get(
                type ? `/api/admin/order?pageNumber=${page}&type=${type}` : `/api/admin/order?pageNumber=${page}`
            );
            setAllOrders(orders);
            setPages(_pages);
            setCurrentPage(_currentPage)
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error(error?.response?.data?.message || 'something went wrong.')
            
        }
    }

    useEffect(() => {
        fetchOrders();
    }, [])

    const handleTabClick = tab => {
        setActiveTab(tab?.id);
        fetchOrders(currentPage , tab?.type , setAllOrders );
        setProductType(tab?.type);
    }

    return (
        <div className='w-full min-h-screen h-full flex'>
             <div className={`fixed top-0 md:left-0  duration-300 ease-in-out ${showAdminDrawer ? 'left-0' : '-left-full'} w-[250px] h-screen z-[999]`}>
                <Sidebar />
            </div>
            <div className='w-full bg-bgColor md:ml-[250px] py-6 px-4'>
                <div className='text-4xl text-primary flex items-center justify-between sm:px-0 px-2'>
                    <h3>All Orders</h3>
                    <div className='md:hidden flex text-4xl text-secondary cursor-pointer'
                    onClick={() => setShowAdminDrawer(true)}>
                        <i className="uil uil-bars"></i>
                    </div>
                </div>
                <div className='bg-bgColor shadow-1 mt-6'>
                    <div className='sm:p-4 py-4 px-2 border-b border-b-primary flex items-center justify-between '>
                        <div className='flex items-center border border-primaryLight rounded-md text-primaryLight sm:text-base text-xs'>
                            {
                                tabs?.map(tab => {
                                    return <p 
                                    className={`${activeTab === tab.id ? 'bg-primary text-black' : ''} py-1.5 cursor-pointer px-4 border-r border-r-primaryLight `} 
                                    key={tab?.id}
                                    onClick={() => handleTabClick(tab)}
                                    >
                                        {tab?.name}
                                    </p>
                                })
                            }
                        </div>
                    </div>
                    {
                        loading 
                        ? 
                            <div className='w-full h-full flex items-center justify-center py-12'>
                                <ClipLoader size={20} color='#fff' />
                            </div>
                        : 
                            <>
                                <Table 
                                allOrders={allOrders}
                                />
                                <Pagination 
                                pages={pages}
                                currentPage={currentPage}
                                fetchOrders={fetchOrders}
                                productType={productType}
                                />
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Orders;