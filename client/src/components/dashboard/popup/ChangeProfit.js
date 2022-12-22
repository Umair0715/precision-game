import { useState } from 'react'
import Header from './Header';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useAdminContext } from '../../../context/adminContext';


const ChangeProfit = () => {
    const [profit , setProfit] = useState('');
    const [loading , setLoading] = useState(false);
    const { setShowAdminPopup , setAdminCurrentProfit } = useAdminContext();

    const submitHandler = async (e) => {
        e.preventDefault();
        if(isNaN(profit)){
            setProfit('');
            return toast.error('Invalid input. Only numbers are allowed.')
        }
        try {
            setLoading(true);
            const { data : { data : { message , profit : _profit } } } = await axios.put('/api/adminProfit' , { profit : Number(profit) } , {
                headers : {
                    'content-type' : 'application/json'
                }
            });
            setAdminCurrentProfit(_profit);
            toast.success(message);
            setProfit('');
            setShowAdminPopup(false);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log('change profit error' , error);
            toast.error(error?.response?.data?.message || 'something went wrong.');
        }
    }

    return (
       <div>
            <div>
                <Header heading='Change Profit'/>
            </div>
            <div className='mt-6 chatsScroll h-full sm:px-4 px-2 overflow-auto'>
                <form className='flex flex-col gap-6' onSubmit={submitHandler}>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="profit" className='text-primary font-semibold'>
                            Profit Percentage
                        </label>
                        <input 
                        id='profit'
                        type="text"
                        placeholder='Enter your profit percentage'
                        className='border border-primary outline-none rounded-lg py-2 px-3 bg-gray-300'
                        onChange={e => setProfit(e.target.value)}
                        value={profit}
                        required 
                        />
                    </div>
                    <div>
                        <button 
                        className="btn-primary py-3 px-12 uppercase"
                        disabled={loading}
                        type='submit'
                        >
                            {loading ? <ClipLoader size={20} /> : 'Change Profit' }
                        </button>
                    </div>
                </form>
            </div>
       </div>
    )
}

export default ChangeProfit;