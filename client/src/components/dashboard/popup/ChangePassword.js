import React, { useState } from 'react'
import Header from './Header';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAdminContext } from '../../../context/adminContext';
import { ClipLoader } from 'react-spinners';

const ChangePassword = () => {
    const [oldPassword , setOldPassword] = useState('');
    const [newPassword , setNewPassword] = useState('');
    const [confirmPassword , setConfirmPassword] = useState('');
    const [loading , setLoading] = useState(false);
    const { setShowAdminPopup } = useAdminContext();

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data : { data : { message} } } = await axios.put(`/api/auth/update-password` , {
                oldPassword , newPassword , confirmPassword
            } , {
                headers : {
                    'content-type' : 'application/json'
                }
            });
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setShowAdminPopup(false);
            toast.success(message);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error(error?.response?.data?.message || 'something went wrong.')
        }
    }   

    return (
       <div>
            <div>
                <Header heading='Change Password'/>
            </div>
            <div className='mt-6 chatsScroll h-full sm:px-4 px-2 overflow-auto'>
                <form className='flex flex-col gap-6' onSubmit={submitHandler}>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="oldPassword" className='text-primary font-semibold'>
                            Old Password
                        </label>
                        <input 
                        id='oldPassword'
                        type="password"
                        placeholder='Enter your previous password'
                        className='border border-primary outline-none rounded-lg py-2 px-3 bg-gray-300'
                        onChange={e => setOldPassword(e.target.value)}
                        value={oldPassword}
                        required
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="newPassword" className='text-primary font-semibold'>
                            New Password
                        </label>
                        <input 
                        id='newPassword'
                        type="password"
                        placeholder='Enter your new password'
                        className='border border-primary outline-none rounded-lg py-2 px-3 bg-gray-300'
                        onChange={e => setNewPassword(e.target.value)}
                        value={newPassword}
                        required
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="confirmPassword" className='text-primary font-semibold'>
                            Confirm Password
                        </label>
                        <input 
                        id='confirmPassword'
                        type="password"
                        placeholder='Re-enter new password'
                        className='border border-primary outline-none rounded-lg py-2 px-3 bg-gray-300'
                        onChange={e => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        required
                        />
                    </div>
                    <div>
                        <button 
                        className="btn-primary py-3 px-12 uppercase"
                        type='submit'
                        disabled={loading}
                        >
                            {loading ? <ClipLoader size={20} /> : 'Change Password'}
                        </button>
                    </div>
                </form>
            </div>
       </div>
    )
}

export default ChangePassword;