import React from 'react'
import { useSelector } from 'react-redux';

const Header = () => {
    const { ordersCount } = useSelector(state => state.orders);

    return (
        <div className='w-full flex items-center justify-between border-b border-b-primary sm:p-4 py-4 px-2'>
            <div>
                <div className='flex items-center gap-2'>
                    <h5 className='text-[17px] font-semibold text-secondary'>My Orders</h5>
                    <div className='bg-primary py-1 px-3 rounded-full sm:text-xs text-[10px] text-black'>
                        {ordersCount} items
                    </div>
                </div>
                <p className='sm:text-sm text-xs text-primaryLight mt-1.5 '>Keep track of all your products, services and accounts</p>
            </div>
           
        </div>
    )
}

export default Header