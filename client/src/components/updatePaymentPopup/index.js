import React, { useRef, useState } from 'react'
import { usePaymentContext } from '../../context/paymentContext';
import Header from './Header';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import { toast } from 'react-toastify';


const options = [
    {
        val : 1 ,
        name : 'Pending'
    },
    {
        val : 2 ,
        name : 'Paid'
    } ,
    {
        val : 3 ,
        name : 'Declined'
    }
]

const UpdatePaymentPopup = () => {
    const imageRef = useRef();
    const { currentPayment , setShowUpdatePaymentPopup } = usePaymentContext();
    const [image , setImage] = useState('');
    const [status , setStatus] = useState(currentPayment?.status);
    const [loading , setLoading] = useState(false);

    const handleChange = async (e) => {
        let file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (readerEvent) => { 
            setImage(readerEvent.target.result);
        }
    }

   

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.put(`/api/withdraw/${currentPayment?._id}` , {
                image ,
                status 
            } , {
                headers : {
                    'content-type' : 'application/json'
                }
            });
            toast.success('Withdraw request updated successfully.')
            setShowUpdatePaymentPopup(false);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error(error?.response?.data?.message || 'something went wrong.')
        }

    }


    return (
        <div className='w-full h-screen fixed top-0 left-0 bg-black bg-opacity-50 z-[999] flex items-center justify-center'>
            <div className=' bg-bgColor pb-8 lg:w-1/2 md:w-[60%] sm:w-[70%] w-full'>
                <Header />
                <form className='flex flex-col gap-6 pt-6 px-4' onSubmit={handleSubmit}>
                
                    <div className='flex flex-col gap-2 sm:flex-[0.6] flex-1 w-full '>
                        <label htmlFor="Status" className='text-primary font-semibold'>
                            Status
                        </label>
                        <select 
                        id='status'
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        required
                        className='border border-primary outline-none rounded-lg py-2 px-3 bg-gray-300 '
                        >
                            {
                                options?.map(op => (
                                    <option
                                    value={op?.val}
                                    key={op?.val}
                                    >
                                        {op?.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='flex flex-col gap-2 text-primary'>
                        <input 
                        type="file" 
                        hidden 
                        ref={imageRef}
                        onChange={handleChange}
                        required
                        />
                        <label htmlFor="image" className='text-primary font-semibold'>Add Payment Proof</label>
                        {
                            image 
                            ? 
                                <div className='flex items-center gap-4'>
                                    <img src={image} alt="Preview" className='w-[100px] h-[100px] object-cover rounded-tr-[20px] rounded-bl-[20px]' />
                                    <p 
                                    className='btn-secondary py-2 px-4'
                                    onClick={() => imageRef.current.click()}
                                    >
                                        Change Image
                                    </p>
                                </div>
                            : 
                            <div  
                            className='w-[100px] h-[100px] border border-dashed border-secondary rounded-tr-[20px] rounded-bl-[20px] flex items-center justify-center text-secondary text-xl cursor-pointer'
                            onClick={() => imageRef.current.click()}
                            >
                                <i className="uil uil-plus"></i>
                            </div>
                        }
                    </div>
                    <div>
                        <button
                        type='submit' 
                        className="btn-primary py-3 px-12 uppercase"
                        disabled={loading}
                        >
                            {loading ? <ClipLoader size={20} /> : 'Add Item'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdatePaymentPopup