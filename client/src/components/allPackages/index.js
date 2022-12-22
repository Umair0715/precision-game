/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPackages } from '../../redux/actions/packageActions';
import { CLEAR_ERRORS } from '../../redux/constants/packageConstants';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { useLocation } from 'react-router-dom';
import { useAdminContext } from '../../context/adminContext';
import axios from 'axios';

const AllPackages = ({ mySubscription = null }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { packages , setPackages } = useAdminContext();
    const { user } = useSelector(state => state.auth);
    const [_loading , _setLoading] = useState(false);
    const { error , loading } = useSelector(state => state.packages);

    useEffect(() => {
        dispatch(fetchAllPackages(setPackages));
    }, [dispatch]);

    useEffect(() => {
        if(error){
            toast.error(error);
            dispatch({ type : CLEAR_ERRORS })
        }
    }, [error , dispatch]);


    const deletePackageHandler = async (id) => {
        if(window.confirm('Are you sure you want to delete this package?')){
            try {
                const {data : { data : { message} } } = await axios.delete(`/api/admin/package/${id}`);
                toast.success(message);
                setPackages(packages?.filter(p => p._id !== id));
            } catch (error) {
                toast.error(error?.response?.data?.message || 'something went wrong.')
            }
        }
        return;
    }

    const buyNowHandler = async (p) => {
        try {
            _setLoading(true);
            const { data : { data : { url } } } = await axios.post('/api/stripe/create-subscription-checkout-session' , { 
                package : p ,
                userId : user?._id 
            } , {
                headers : {
                    'content-type' : 'application/json'
                }
            });
            window.location.href = url;
            _setLoading(false);
        } catch (error) {
            _setLoading(false);
            toast.error(error?.response?.data?.message || 'something went wrong.')
        }
    }
    

    return (
        <>
            {
                loading 
                ? 
                    <div className='w-full h-full flex items-center justify-center '>
                        <ClipLoader size={25} color='#fff' />
                    </div>
                : 
                packages?.length > 0 
                ? 
                <div className='w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
                    {
                        packages?.map( p => (
                            <div key={p?._id} className='bg-bgColor pt-6 pb-8 flex flex-col items-center justify-center text-primary rounded-tr-[40px] rounded-bl-[40px] gap-4 border border-secondary'>
                                <div className='text-center'>
                                    <h5 className='text-xl font-medium'>{p?.name}</h5>
                                    <p className='text-sm font-[100] mt-[1px]'>{p?.shortDescription}</p>
                                </div>
                                <h3 className='text-3xl font-bold'>
                                    ${p?.price}
                                    <span className='text-sm font-[100]'>
                                        /{p?.duration === 1 ? 'Week' : p?.duration === 2 ? 'Month' : p?.duration === 3 ? '6 Month' : p?.duration === 4 ? 'year' : 'No Defined' }
                                    </span>
                                </h3>
                                <div className='bg-primary w-full h-[1px]'></div>
                                <div className='text-sm flex flex-col gap-3 text-center font-[100]'>
                                    {
                                        p?.features?.map((f,i) => (
                                            <p key={i}>{f ? f : ''}</p>
                                        ))
                                    }
                                </div>
                                <div>
                                    {
                                        location?.pathname === '/admin/packages' && user?.role ===3 
                                        ? 
                                        <button className="uppercase btn-primary py-2 5 px-8"
                                        onClick={() => deletePackageHandler(p?._id)}>
                                            DELETE PACKAGE 
                                        </button>
                                        : 
                                        mySubscription?.package?.toString() === p?._id?.toString() 
                                        ? 
                                            <button className="uppercase btn-primary py-2 5 px-8 "
                                            disabled
                                            >
                                                SUBSCRIBED 
                                            </button>
                                        :
                                        <button className="uppercase btn-primary py-2 5 px-8 disabled:cursor-not-allowed"
                                        disabled={_loading}
                                        onClick={() => buyNowHandler(p)}>
                                            {_loading ? 'Loading...' : 'SUBSCRIBE NOW'} 
                                        </button>
                                    }
                                </div>
                            </div>
                        
                    ))
                    }
                </div>
                : 
                    <div className='w-full h-full flex items-center justify-center text-gray-400 font-semibold text-3xl'>
                        No package created yet.
                    </div>
            }
        </>
    )
}

export default AllPackages