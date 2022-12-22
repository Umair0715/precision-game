/* eslint-disable */
import React, { useEffect, useState } from 'react'
import Table from './Table'
import Header from './Header'
import Pagination from './Pagination'
import { useProductContext } from '../../../context/productContext';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { GET_PRODUCTS_SUCCESS } from '../../../redux/constants/productConstants';
import axios from 'axios';
import {DebounceInput} from 'react-debounce-input';


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

const Listings = () => {
    const dispatch = useDispatch();
    const [loading ,setLoading] = useState(false);
    const { 
        products , setProducts , pages , setPages , 
        currentPage : _currentPage , 
        setCurrentPage , setProductType , productType 
    } = useProductContext();
    const [activeTab , setActiveTab] = useState('1');
    

    const fetchProducts = async (page = 1 , type = '' , keyword = '' ) => {
        try {
            setLoading(true);
            const { data : { data : { products , pages , currentPage , productsCount } } } = await axios.get(`${
                type && keyword ? `/api/product/my?pageNumber=${page}&type=${type}&keyword=${keyword}` 
                : type ? `/api/product/my?pageNumber=${page}&type=${type}` 
                : keyword ? `/api/product/my?pageNumber=${page}&keyword=${keyword}` : `/api/product/my?pageNumber=${page}` 
                } ` , { 
                headers : {
                    'content-type' : 'application/json'
                }
            });
            dispatch({ type : GET_PRODUCTS_SUCCESS , payload : { products , pages , currentPage , productsCount } });
            setLoading(false);
            setProducts(products);
            setPages(pages);
            setCurrentPage(currentPage);
        } catch (err) {
            setLoading(false);
            toast.error(err.response && err.response.data.message ? err.response.data.message : err.message || 'something went wrong.')
        }
    }
    
    useEffect( () => {
        fetchProducts();
    }, [])

    const handleTabClick = tab => {
        setActiveTab(tab?.id);
        fetchProducts(_currentPage , tab?.type )
        setProductType(tab?.type);
    }

    const handleSearchChange = (e) => {
        fetchProducts(_currentPage , productType , e.target.value)
    }

    return (
        <div>
            <Header fetchProducts={fetchProducts}/>
            <div className='sm:p-4 py-4 px-2 border-b border-b-primary flex items-center justify-between '>
                <div className='flex items-center border border-primaryLight rounded-md text-primaryLight '>
                    {
                        tabs?.map(tab => {
                            return <p 
                            className={`${activeTab === tab?.id ? 'bg-primary text-black' : ''} py-1.5 cursor-pointer px-4 border-r border-r-primaryLight `} 
                            key={tab?.id}
                            onClick={() => handleTabClick(tab)}
                            >
                                {tab?.name}
                            </p>
                        })
                    }
                </div>
                <div className='sm:flex hidden items-center gap-4'>
                <DebounceInput
                    debounceTimeout={300}
                    onChange={handleSearchChange} 
                    className='py-2 px-3 rounded-md outline-none bg-inherit text-primary placeholder:text-primary border border-primary'
                    placeholder='Search..'
                />
                    {/* <form onSubmit={handleSearchSubmit}>
                        <div className='flex items-center gap-4 border border-primaryLight text-primary py-1.5 px-4 rounded-md'>
                            <i className="uil uil-search"></i>
                            <input 
                            type="text" 
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className='border-none outline-none bg-inherit text-primary placeholder:text-primary'
                            placeholder='Search..'
                            />
                        </div>
                    </form> */}
                </div>
            </div>
            {
                loading 
                ? 
                    <div className='w-full h-full flex items-center justify-center py-12 '>
                        <ClipLoader size={25} />
                    </div>
                : 
                products?.length > 0 
                ? 
                    <>
                        <Table products={products}/>
                        <Pagination pages={pages} fetchProducts={fetchProducts}/>
                    </>
                : 
                    <div className='py-12 flex items-center justify-center text-gray-400 text-2xl font-semibold'>No Product Found</div>
            }
        </div>
    )
}

export default Listings