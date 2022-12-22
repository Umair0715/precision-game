import React, { useState } from 'react'
import { useAuthContext } from '../../../context/authContext'
import Header from '../header';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

const ForgotPassword = () => {
    const { setCurrentAuthPopup , setShowAuthPopup } = useAuthContext();
    const [email , setEmail] = useState();
    const [loading , setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data : { data : { message } } } = await axios.post('/api/auth/forgot-password' , { email } , {
                headers : {
                    "Content-Type" : "application/json"
                }
            });
            console.log(message);
            setLoading(false);
            setShowAuthPopup(false);
            setEmail('');
            toast.success(message);
        } catch (err) {
            setLoading(false);
            console.log('forgot password error' , err);
            toast.error(err?.response?.data?.message || 'Something went wrong.' )
        }
    }


    return (
        <div className=' lg:w-[50%] md:w-[60%] sm:w-[70%] w-full '>
            <Header heading='Reset Password' />
            <div className='bg-bgColor w-full h-full sm:p-6 py-6 px-3'>
                <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
                    <div className='w-full flex flex-col gap-2 text-primary'>
                        <label 
                        htmlFor='email' 
                        className='text-[17px]'
                        >
                            Enter your Email address to receieve a password reset link
                        </label>
                        <input 
                        type="email" 
                        placeholder='Enter valid email ID' 
                        id='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className='border-2 border-secondary outline-none rounded-xl p-2 bg-gray-300 text-black '
                        />
                    </div>
                    <div>
                        <button 
                        className="btn-primary py-3 px-20"
                        disabled={loading || !email}
                        >
                            {loading ? <ClipLoader size={20} /> : 'Send Link'}
                        </button>
                    </div>
                    {/* <div className='text-primaryLight underline cursor-pointer text-sm flex gap-2'>
                        <span>Not recieved a link yet?</span>
                        <p onClick={() => setCurrentAuthPopup(4)}>Resend</p>
                    </div> */}
                    
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword;