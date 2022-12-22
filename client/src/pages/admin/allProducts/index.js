import React, { useState } from 'react'
import Sidebar from '../../../components/dashboard/sidebar';
import Pagination from './Pagination';
import { useAdminContext } from '../../../context/adminContext';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { checkAdmin } from "../../../utils/redirectTo";
import { fetchProducts } from '../../../redux/actions/productActions';
import { toast } from 'react-toastify';
import { CLEAR_ERRORS } from '../../../redux/constants/productConstants';
import { ClipLoader } from 'react-spinners';
import { DebounceInput } from 'react-debounce-input';
import LazyLoad from 'react-lazyload';



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

const AllProducts = () => {
    const {showAdminDrawer , setShowAdminDrawer } = useAdminContext();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth)
    const [allProducts , setAllProducts] = useState();
    const { products , error , loading } = useSelector(state => state.products)
    const [activeTab , setActiveTab] = useState('1');
    const [productType , setProductType] = useState();
    const [keyword , setKeyword] = useState('');

    useEffect(() => {
        checkAdmin(navigate , user);
    }, [user , navigate]);
    
    useEffect( () => {
        dispatch(fetchProducts(1, null , null , setAllProducts));
    }, [dispatch]);

    useEffect(() => {
        if(error){
            toast.error(error);
            dispatch({ type : CLEAR_ERRORS })
        }
    }, [error, dispatch])

    const handleTabClick = tab => {
        setActiveTab(tab?.id);
        dispatch(fetchProducts(products?.currentPage , tab?.type , keyword , setAllProducts ));
        setProductType(tab?.type);
    }

    const handleSearchChange = (e) => {
        dispatch(fetchProducts(products?.currentPage , productType , e.target.value , setAllProducts));
        setKeyword(e.target.value);
    }


    return (
        <div className='w-full min-h-screen h-full flex'>
            <div className={`fixed top-0 md:left-0  duration-300 ease-in-out ${showAdminDrawer ? 'left-0' : '-left-full'} w-[250px] h-screen z-[999]`}>
                <Sidebar />
            </div>
            <div className='w-full bg-bgColor md:ml-[250px] py-6 sm:px-4'>
                <div className='text-4xl text-primary flex items-center justify-between sm:px-0 px-2'>
                    <h3>All Products</h3>
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
                        <div className='lg:flex hidden items-center gap-4'>
                            <div className='flex items-center gap-4 border border-primaryLight text-primary py-1.5 px-4 rounded-md'>
                                <DebounceInput
                                    debounceTimeout={300}
                                    onChange={handleSearchChange} 
                                    className='outline-none bg-inherit text-primary placeholder:text-primary '
                                    placeholder='Search..'
                                />
                            </div>
                        </div>
                    </div>
                    {
                        loading 
                        ? 
                            <div className='w-full h-full flex items-center justify-center py-12'>
                                <ClipLoader size={25} color='#fff' />
                            </div>
                        : 
                            <>
                            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-8 py-6 px-4'>
                                {
                                    allProducts?.map(product => (
                                        <div className='bg-black bg-opacity-70 rounded-tr-[30px] rounded-bl-[30px] ' key={product?._id}>
                                            <div className='flex items-center justify-between py-3 px-6 text-secondary uppercase'>
                                                <h5>{product?.seller?.name}</h5>
                                                <p>${product?.price}</p>
                                            </div>
                                            <div className='px-6 py-2'>
                                                <LazyLoad>
                                                    <img src={`/products/${product?.image}`} alt={product?.title} className='rounded-tr-[30px] rounded-bl-[30px] w-full lg:h-[200px] md:h-[250px] h-[280px] object-cover'/>
                                                </LazyLoad>
                                            </div>
                                            <div className='px-6 py-4 text-primary '>
                                                <h5 className='uppercase font-semibold'>{product?.title}</h5>
                                                <p className='text-primaryLight text-xs'>{product?.description}</p>
                                            </div>
                                        
                                        </div>
                                    ))
                                }
                            </div>
                            <Pagination 
                            productType={productType} 
                            keyword={keyword} 
                            setAllProducts={setAllProducts}
                            />
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

export default AllProducts