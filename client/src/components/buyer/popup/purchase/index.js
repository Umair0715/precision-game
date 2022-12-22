import { useSelector } from 'react-redux';
import Header from '../Header';
import { toast } from 'react-toastify';
import axios from 'axios';
import { createPayment } from '../../../../utils/payment';
import { useState } from 'react';

const MakePurchase = () => {
    const { cartItems } = useSelector(state => state.cart);
    const [buttonText , setButtonText] = useState('Pay Now');
    const [loading , setLoading] = useState(false);


    const payNowHandler = async () => {
        setButtonText('Please Wait...');
        setLoading(true);
        cartItems?.forEach( async item => {
            try {
                const { data : { data : { order } } } = await axios.post('/api/order' , { 
                    seller : item?.seller?._id , 
                    amount : item?.price ,
                    productType : item?.type ,
                    orderItem : item?._id 
                } , {
                    headers : {
                        'content-type' : 'application/json'
                    }
                });
                localStorage.setItem('currentOrders' , JSON.stringify([...JSON.parse(localStorage.getItem('currentOrders')) , order]));
            } catch (err) {
                setLoading(false);
                setButtonText('Pay Now');
                console.log('create Order Error from paynow popup ' , err)
                toast.error(err?.response?.data?.message);
            }
        });

        await createPayment(cartItems , toast , setButtonText , setLoading);
        localStorage.setItem('cartItems' , JSON.stringify([]));
        
    }

    return (
        <div>
            <Header heading='Make Purchase' />
            <div className='py-8 px-12'>
                <h4 className='text-primary text-[17px] font-medium'>Select Payment Method</h4>
                <div className='flex flex-col gap-6 mt-4'>
                    {/* <div className='border border-secondary hover:border-primary cursor-pointer rounded-lg bg-[#5A5650] flex justify-between py-3 px-4'>
                        <div className='flex gap-2'>
                            <div className='w-[50px] h-[30px]'>
                                <img src="/svgs/visa-card.svg" alt="Visa card" className='w-full h-full object-cover rounded-lg translate-y-1' />
                            </div>
                            <label htmlFor='visa' className='text-secondary font-[100] text-sm cursor-pointer'>
                                <p>Visa ending in 1234</p>
                                <p>Expiry 06/2024</p>
                            </label>
                        </div>
                        <div>
                            <input type="radio" name="paymentMethod" id='visa'  />
                        </div>
                    </div>
                    <div className='border border-secondary hover:border-primary cursor-pointer rounded-lg bg-[#5A5650] flex justify-between py-3 px-4'>
                        <div className='flex gap-2'>
                            <div className='w-[50px] h-[30px]'>
                                <img src="/svgs/master-card.svg" alt="Visa card" className='w-full h-full object-cover rounded-lg translate-y-1' />
                            </div>
                            <label htmlFor='mastercard' className='text-secondary font-[100] text-sm cursor-pointer'>
                                <p>Mastercard ending in 1234</p>
                                <p>Expiry 06/2024</p>
                            </label>
                        </div>
                        <div>
                            <input type="radio" name="paymentMethod"  id='mastercard'/>
                        </div>
                    </div> */}
                    <div className='border border-secondary hover:border-primary cursor-pointer rounded-lg bg-[#5A5650] flex justify-between py-3 px-4'>
                        <div className='flex gap-2'>
                        <div className='w-[50px] h-[30px]'>
                            <img src="/svgs/paypal.svg" alt="Visa card" className='w-full h-full object-cover rounded-lg translate-y-1' />
                        </div>
                        <label htmlFor='paypal' className='text-secondary font-[100] text-sm cursor-pointer'>
                            <p>Paypal ending in 1234</p>
                            <p>Expiry 06/2024</p>
                        </label>
                        </div>
                        <div>
                            <input type="radio" name="paymentMethod"  id='paypal' checked/>
                        </div>
                    </div>
                </div>
                <div className='mt-8'>
                    <button 
                    className="btn-primary py-3 px-16 disabled:cursor-not-allowed" 
                    disabled={loading}
                    onClick={() => payNowHandler()}
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MakePurchase