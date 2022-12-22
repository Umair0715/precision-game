import React from 'react'
import { useSellerContext } from '../../../context/sellerContext'

const tabs = [
    {
        id : 1 ,
        name : 'My Listing'
    } ,
    {
        id : 2 ,
        name : 'My Orders'
    } ,
    {
        id : 3 ,
        name : 'Chat'
    } ,
    {
        id : 4 ,
        name : 'Customer Support'
    } ,
    {
        id : 5 ,
        name : 'Wallet'
    }
]

const Tabs = () => {
    const { sellerActiveTab , setSellerActiveTab } = useSellerContext();

    return (
        <>
            <div className='hidden lg:flex flex-col gap-4 relative z-50'>
                {
                    tabs?.map((tab , i) => (
                        <button 
                        key={i}
                        className={`${sellerActiveTab === tab?.id ? 'btn-primary scale-110' : 'btn-secondary '} py-5 px-4 text-xl uppercase `}
                        onClick={() => setSellerActiveTab(tab?.id)}
                        >
                            {tab?.name}
                        </button>
                    ))
                }
            </div>
            <div className='flex items-center lg:hidden sm:gap-8 gap-3 relative sm:pl-0 pl-2'>
                {
                    tabs?.map((tab , i) => (
                        <p 
                        key={i}
                        className={`${sellerActiveTab === tab?.id ? 'text-primary' : 'text-secondary '} md:text-xl sm:text-base text-sm capitalize cursor-pointer`}
                        onClick={() => setSellerActiveTab(tab?.id)}
                        >
                            {tab?.name}
                        </p>
                    ))
                }
            </div>
        </>
    )
}

export default Tabs