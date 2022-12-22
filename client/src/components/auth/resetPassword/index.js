import { useAuthContext } from '../../../context/authContext';
import Header from '../header';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useParams } from 'react-router-dom';


const ResetPassword = () => {
    const { token } = useParams();
    const { setCurrentAuthPopup } = useAuthContext();
    const [newPassword , setNewPassword] = useState('');
    const [confirmPassword , setConfirmPassword] = useState('');
    const [loading , setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data : { data : { message } } } = await axios.post(`/api/auth/reset-password/${token}` , { newPassword , confirmPassword } , {
                headers : {
                    'Content-Type' : 'Application/json'
                }
            });
            console.log(message)
            setLoading(false);
            toast.success('Password reset successfully. Please login.');
            setCurrentAuthPopup(1);
        } catch (err) {
            setLoading(false);
            toast.error(err?.response?.data?.message || "Something went wrong.");
        }

    }

    return (
        <div className=' lg:w-[50%] md:w-[60%] sm:w-[70%] w-full '>
            <Header heading='New Password' />
            <div className='bg-bgColor w-full h-full sm:p-6 py-6 px-3'>
                <form className='flex flex-col gap-6' onSubmit={handleSubmit} >
                    <div className='w-full flex flex-col gap-2 text-primary'>
                        <label htmlFor='password' className='text-[17px]'>
                                New Password
                        </label>
                        <input 
                        type="password" 
                        placeholder='Enter a new password ' 
                        id='password'
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        required
                        className='border-2 border-secondary outline-none rounded-xl p-2 bg-gray-300 text-black '
                        />
                    </div>
                    <div className='w-full flex flex-col gap-2 text-primary'>
                        <label htmlFor='confirmPassword' className='text-[17px]'>Confirm New Password</label>
                        <input 
                        type="password" 
                        placeholder='Re-type the new password' 
                        id='confirmPassword'
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                        className='border-2 border-secondary outline-none rounded-xl p-2 bg-gray-300 text-black '
                        />
                    </div>
                    <div>
                        <button 
                        type='submit'
                        className="btn-primary py-3 sm:px-20 px-12 "
                        disabled={loading || !newPassword || !confirmPassword}
                        >
                            {loading ? <ClipLoader size={20} /> : 'Change Password'}
                        </button>
                    </div>
                    <div>
                        <p className='cursor-pointer text-sm underline text-primaryLight'
                        onClick={() => setCurrentAuthPopup(1)}
                        >
                            Back to Login
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword;