import { useState } from 'react';
import Header from './Header';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { useSellerContext } from '../../../context/sellerContext';


const tabs = [
    {
        id : 1 ,
        name : 'Bank'
    },
    {
        id : 2 ,
        name : 'Stripe' 
    },
    {
        id : 3 , 
        name : "Paypal"
    }
]

const WithdrawPopup = () => {
    const [activeTab , setActiveTab] = useState(1);
    const [accountName , setAccountName ] = useState('');
    const [accountNumber , setAccountNumber] = useState('');
    const [stripeEmail , setStripeEmail] = useState('');
    const [paypalEmail , setPaypalEmail] = useState('');
    const [amount , setAmount] = useState(0);
    const [loading , setLoading] = useState(false);
    const { setShowWithdrawPopup } = useSellerContext();

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        let withdrawData = {};
        if(activeTab === 1){
            withdrawData = {
                paymentMethod : 1 , //Bank
                bankIBAN : accountNumber ,
                bankAccountName : accountName ,
                amount : Number(amount),
            }
        }else if(activeTab === 2 ){
            withdrawData = {
                paymentMethod : 2 , //Stripe
                stripeEmail ,
                amount : Number(amount),
            }
        }else if (activeTab === 3){
            withdrawData = {
                paymentMethod : 3 , //paypal
                paypalEmail ,
                amount : Number(amount),
            }
        }else {
            withdrawData = 'not defined'
        }

        try {
            await axios.post('/api/withdraw' , withdrawData , {
                headers : {
                    'content-type' : 'application/json'
                }
            });
            setLoading(false);
            setShowWithdrawPopup(false);
            toast.success('Withdraw request created successfully.');
        } catch (error) {
            setLoading(false);
            toast.error(error?.response?.data?.message || 'something went wrong.')
        }
    }

    return (
        <div className='w-full h-screen fixed top-0 left-0 bg-black bg-opacity-50 z-[99] flex items-center justify-center'>
            <div className=' bg-bgColor pb-8 lg:w-1/2 md:w-[60%] sm:w-[70%] w-full'>
                <Header />
                <div className='sm:px-6 px-3 pt-6'>
                    <div className='flex flex-col gap-3 text-primary'>
                        <h5>Payment Method</h5>
                        <div className='border border-primaryLight rounded-md flex items-center w-fit'>
                            {
                                tabs?.map((tab,i) => (
                                    <div 
                                    key={tab?.id}
                                    className={`py-2 px-4 border-r border-r-primaryLight cursor-pointer
                                    ${tabs?.length - 1 === i ? 'border-none' : ''} 
                                    ${activeTab === tab?.id ? 'bg-primary text-black font-semibold' : ''}
                                    `}
                                    onClick={() => setActiveTab(tab?.id)} 
                                    >
                                        {tab?.name}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className='pt-6 sm:px-6 px-3'>
                    <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="amount" className='text-primary font-semibold'>
                            Withdraw Amount $ 
                        </label>
                        <input 
                        id='amount'
                        type="number"
                        value={amount}
                        min={50}
                        onChange={e => setAmount(e.target.value)}
                        required
                        placeholder='Enter amount you want to withdraw (min $10)'
                        className='border border-primary outline-none rounded-lg py-2 px-3 bg-gray-300 '
                        />
                    </div>
                    {
                        activeTab === 1
                        ? 
                            <>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="acountName" className='text-primary font-semibold'>
                                        Account Name
                                    </label>
                                    <input 
                                    id='acountName'
                                    type="text"
                                    value={accountName}
                                    onChange={e => setAccountName(e.target.value)}
                                    required
                                    placeholder='Enter your bank account name'
                                    className='border border-primary outline-none rounded-lg py-2 px-3 bg-gray-300 '
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="acountNumber" className='text-primary font-semibold'>
                                        Account IBAN 
                                    </label>
                                    <input 
                                    id='acountNumber'
                                    type="number"
                                    value={accountNumber}
                                    onChange={e => setAccountNumber(e.target.value)}
                                    required
                                    placeholder='Enter your bank account IBAN number'
                                    className='border border-primary outline-none rounded-lg py-2 px-3 bg-gray-300'
                                    />
                                </div>
                            </>
                        : 
                        activeTab === 2 
                        ? 
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="stripeEmail" className='text-primary font-semibold'>
                                    Stripe Email
                                </label>
                                <input 
                                id='stripeEmail'
                                type="email"
                                value={stripeEmail}
                                onChange={e => setStripeEmail(e.target.value)}
                                required
                                placeholder='Enter your stripe account email'
                                className='border border-primary outline-none rounded-lg py-2 px-3 bg-gray-300 '
                                />
                            </div>
                        : 
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="paypalEmail" className='text-primary font-semibold'>
                                    Paypal Email
                                </label>
                                <input 
                                id='paypalEmail'
                                type="email"
                                value={paypalEmail}
                                onChange={e => setPaypalEmail(e.target.value)}
                                required
                                placeholder='Enter your paypal account email'
                                className='border border-primary outline-none rounded-lg py-2 px-3 bg-gray-300 '
                                />
                            </div>
                    }     
                        <button
                        type='submit' 
                        className="btn-primary py-2 px-8 w-fit disabled:cursor-not-allowed "
                        disabled={loading}
                        >
                            {loading ? <ClipLoader size={20} /> : 'SEND REQUEST'}
                        </button>
                    </form>    
                </div>
            </div>
        </div>
    )
}

export default WithdrawPopup