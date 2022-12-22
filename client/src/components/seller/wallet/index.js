import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import Transactions from '../../transactions';
import { useSellerContext } from '../../../context/sellerContext';
import WalletTabs from '../../walletTabs';
import WithdrawRequests from '../../withdrawRequests';


const Wallet = () => {
    const [wallet , setWallet] = useState();
    const [loading , setLoading] = useState(false);
    const { setShowWithdrawPopup } = useSellerContext();
    const [activeTab , setActiveTab] = useState(1);

    useEffect(() => {
        const fetchUserWallet = async () => {
            try {
                setLoading(true);
                const { data : { data : { wallet : _wallet } } } = await axios.get('/api/wallet');
                setWallet(_wallet);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                console.log('get wallet error' , err);
                toast.error(err?.response?.data?.message || 'something went wrong.')
            }
        }
        fetchUserWallet();
    }, []);

    const withdrawalClickHandler = () => {
        if(wallet?.totalBalance < 50){
            return toast.error('Your wallet must have minimum 50$ to proceed withdraw request.')
        }
        setShowWithdrawPopup(true);
    }

    return (
        <div>
            
            <div className='p-4' onClick={withdrawalClickHandler}>
                <button className="btn-secondary py-3 px-12">WITHDRAW</button>
            </div>
            
            <div className='p-4 grid md:grid-cols-3 sm:grid-cols-2 gap-4'>
                <div className='bg-gradient p-4 flex flex-col gap-2 rounded-lg'>
                    <h3 className='font-semibold text-xl'>TOTAL BALANCE</h3>
                    <p className='font-medium '>{loading ? <ClipLoader size={20} /> : `$${wallet?.totalBalance?.toFixed(2)}`}</p>
                </div>
                <div className='bg-gradient p-4 flex flex-col gap-2 rounded-lg'>
                    <h3 className='font-semibold text-xl'>TOTAL WITHDRAW</h3>
                    <p className='font-medium '>{loading ? <ClipLoader size={20} /> : `$${wallet?.withdrawal?.toFixed(2)}`}</p>
                </div>
                <div className='bg-gradient p-4 flex flex-col gap-2 rounded-lg'>
                    <h3 className='font-semibold text-xl'>TOTAL EARNING</h3>
                    <p className='font-medium '>{loading ? <ClipLoader size={20} /> : `$${wallet?.earning?.toFixed(2)}`}</p>
                </div>
            </div>
            <div className='mt-12 sm:pl-4 pl-2'>
                <WalletTabs activeTab={activeTab} setActiveTab={setActiveTab}  />
            </div>
            <div className='mt-8'>
                {
                    activeTab === 1 
                    ? 
                        <Transactions />
                    : 
                        <WithdrawRequests />
                }
            </div>
           
        </div>
    )
}

export default Wallet;
