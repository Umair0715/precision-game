/* eslint-disable */

import { useProductContext } from '../../../context/productContext';
import { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { GET_PRODUCTS_SUCCESS } from '../../../redux/constants/productConstants';
import axios from 'axios';
import { DebounceInput } from 'react-debounce-input';
import Pagination from './Pagination';
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

const Trendings = () => {
    const { setShowProductDetailsPopup , setSelectedProduct} = useProductContext();

    const handleProductClick = (product) => {
        setShowProductDetailsPopup(true);
        setSelectedProduct(product);
    }

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
            const { data : { data : { products , pages , currentPage } } } = await axios.get(`${
                type && keyword ? `/api/product?pageNumber=${page}&type=${type}&keyword=${keyword}` 
                : type ? `/api/product?pageNumber=${page}&type=${type}` 
                : keyword ? `/api/product?pageNumber=${page}&keyword=${keyword}` : `/api/product?pageNumber=${page}` 
                } ` , { 
                headers : {
                    'content-type' : 'application/json'
                }
            });
            dispatch({ type : GET_PRODUCTS_SUCCESS , payload : { products , pages , currentPage } });
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
        <div className='lg:px-0 px-4'>
            <div className=' flex flex-col gap-3 '>
                <h3 className='text-3xl sm:text-5xl font-bold text-primary w-fit'>
                    Explore  
                     <span className='text-secondary ml-[5px]'>
                        Top Trending
                    </span>
                </h3>
                <p className='lg:w-1/2 md:w-[60%] sm:w-[70%] w-[90%] text-primaryLight text-sm'>Lorem ipsum dolor sit amet consectetur. Placerat lacus lectus dolor integer eget cursus volutpat sed gravida. Molestie commodo mattis eu vel sit.</p>
            </div>
            <div className='flex items-center justify-between py-10'>
                <div className='flex items-center border border-primaryLight rounded-md text-primaryLight '>
                    {
                        tabs?.map(tab => {
                            return <p 
                            className={`${activeTab === tab.id ? 'bg-primary text-black' : ''} py-1.5 cursor-pointer px-4 border-r border-r-primaryLight sm:text-base text-xs`} 
                            key={tab?.id}
                            onClick={() => handleTabClick(tab)}
                            >
                                {tab?.name}
                            </p>
                        })
                    }
                </div>
                <div className='sm:flex hidden items-center gap-4 '>
                    <DebounceInput
                        debounceTimeout={300}
                        onChange={handleSearchChange} 
                        className='py-2 px-3 rounded-md outline-none bg-inherit text-primary placeholder:text-primary border border-primary'
                        placeholder='Search..'
                    />
                </div>
            </div>
            {
                loading 
                ? 
                    <div className='w-full h-[80vh] flex items-center justify-center'>
                        <ClipLoader size={25} color='#fff' />
                    </div>
                : 
                products?.length > 0 
                ?
                    <div className='flex flex-col gap-8'>
                        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-8'>
                            {
                                products?.map(product => (
                                    <div className='bg-black bg-opacity-70 rounded-tr-[30px] rounded-bl-[30px] flex flex-col justify-between ' 
                                    key={product?._id}
                                    >
                                        <div className='flex items-center justify-between py-3 px-6 text-secondary uppercase'>
                                            <h5>{product?.seller?.name}</h5>
                                            <p>${product?.price}</p>
                                        </div>
                                        <div className='px-6 py-2'>
                                            <LazyLoad>
                                                <img src={`/products/${product?.image}`} alt={product?.title} className='rounded-tr-[30px] rounded-bl-[30px] lg:w-[250px] w-full h-[200px] object-cover'/>
                                            </LazyLoad>
                                        </div>
                                        <div className='px-6 py-4 text-primary '>
                                            <h5 className='uppercase font-semibold'>{product?.title}</h5>
                                            <p className='text-primaryLight text-xs'>{product?.description?.length > 50 ? product?.description?.slice(0,50) + "..." : product?.description}</p>
                                        </div>
                                        <div className='bg-primary flex items-center justify-between rounded-bl-[30px] py-3 px-6'>
                                            <div onClick={() => handleProductClick(product)}>
                                                <button className="btn-secondary py-2 px-6 uppercase">Buy Now</button>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <p className='font-semibold translate-y-[2px]'>4.5</p>
                                                <div>
                                                    <img src="/svgs/star.svg" alt="star" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <Pagination pages={pages} fetchProducts={fetchProducts} />
                    </div>
                : 
                    <div className='w-full h-[60vh] flex items-center justify-center text-gray-400 font-semibld text-4xl'>
                        No Product Found.
                    </div>
            }


        </div>
    )
}

export default Trendings;