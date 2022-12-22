import React from 'react'
import { useSelector } from 'react-redux';
import { useSellerContext } from '../../../context/sellerContext'

const Header = () => {
    const { setShowAddItemPopup } = useSellerContext();
    const { products } = useSelector(state => state.products)

    return (
        <div className='w-full flex items-center justify-between border-b border-b-primary sm:p-4 py-4 px-2'>
            <div className='sm:flex-auto flex-[0.6]'>
                <div className='flex items-center gap-2'>
                    <h5 className='text-[17px] font-semibold text-secondary'>My Listings</h5>
                    <div className='bg-primary py-1 px-3 rounded-full sm:text-xs text-[10px] text-black'>
                        {products?.productsCount} items
                    </div>
                </div>
                <p className='sm:text-sm text-[10px] sm:mt-0 mt-1.5 text-primaryLight '>Keep track of all your products, services and accounts</p>
            </div>
            <div className='flex sm:flex-auto flex-[0.4] justify-end items-center gap-4 '>
                <button className="btn-primary sm:py-2.5 py-2 sm:px-8 px-4 sm:text-base text-sm"
                onClick={() => setShowAddItemPopup(true)}>
                    ADD PRODUCT
                </button>
                
            </div>
        </div>
    )
}

export default Header