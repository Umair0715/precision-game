import React from 'react'

const Header = () => {
    return (
        <div className='w-full flex items-center justify-between border-b border-b-primary p-4'>
            <div>
                <div className='flex items-center gap-2'>
                    <h5 className='text-[17px] font-semibold text-secondary'>My Orders</h5>
                    <div className='bg-primary py-1 px-3 rounded-full sm:text-xs text-[10px] text-black'>
                        187 items
                    </div>
                </div>
                <p className='sm:text-sm text-[10px] text-primaryLight mt-1.5'>Keep track of all your products, services and accounts</p>
            </div>
           
        </div>
    )
}

export default Header