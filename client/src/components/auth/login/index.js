import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../context/authContext'
import Header from '../header';
import { useDispatch , useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../redux/actions/authActions';


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loginError , loading } = useSelector(state => state.auth);
    const { setShowAuthPopup , setCurrentAuthPopup } = useAuthContext();

    const [email , setEmail ] = useState('');
    const [password ,setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email , password } , navigate , toast , setShowAuthPopup ));
    }

    useEffect(() => {
        if(loginError){
            toast.error(loginError);
            dispatch({ type : "CLEAR_ERRORS" })
        }
    }, [loginError , dispatch])


    return (
        <div className=' lg:w-[50%] md:w-[60%] sm:w-[70%] w-full '>
            <Header heading='Login' />
            <div className='bg-bgColor w-full h-full sm:p-6 py-4 px-3'>
                <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
                    <div className='w-full flex flex-col gap-2 text-primary'>
                        <label htmlFor='email' className='text-[17px]'>Email Address</label>
                        <input 
                        type="text" 
                        placeholder='Enter valid email ID' 
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                        className='border-2 border-secondary outline-none rounded-xl p-2 bg-gray-300 text-black '
                        />
                    </div>
                    <div className='w-full flex flex-col gap-2 text-primary'>
                        <label htmlFor='password' className='text-[17px]'>Password</label>
                        <input 
                        type="password" 
                        placeholder='Enter Password' 
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='border-2 border-secondary outline-none rounded-xl p-2 bg-gray-300 text-black '
                        />
                    </div>
                    <div className='flex items-center gap-2 text-sm text-primaryLight font-[100]'>
                        <input type="checkbox"  />
                        <p>Remember me</p>
                    </div>
                    <div>
                        <button
                        type='submit'
                        className="btn-primary py-3 px-20 disabled:cursor-not-allowed"
                        disabled={loading || !email || !password}
                        >
                            {loading ? <ClipLoader size={20} /> : 'Login'}
                        </button>
                    </div>
                    <div className='text-primaryLight underline cursor-pointer text-sm'
                    onClick={() => setCurrentAuthPopup(3)}>
                        <p>Forgot Password?</p>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}

export default Login