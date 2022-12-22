import { useEffect, useState } from 'react'
import { useAuthContext } from '../../../context/authContext';
import Header from '../header'
import { useDispatch } from 'react-redux';
import { register } from '../../../redux/actions/authActions';
import { useSelector } from 'react-redux';  
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userData , setShowAuthPopup } = useAuthContext();
    const { registerError , loading } = useSelector(state => state.auth);

    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [confirmPassword , setConfirmPassword] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            return toast.error('Passwords are not matched.')
        }
        dispatch(register({...userData , name , email , password} , navigate , setShowAuthPopup , toast));
    }

    useEffect(() => {
        if(registerError){
            toast.error(registerError);
            dispatch({ type : 'CLEAT_ERRORS' })
        }
    }, [registerError , dispatch])


    return (
        <div className=' lg:w-[50%] md:w-[60%] sm:w-[70%] w-full '>
            <Header heading='Sign Up' />
            <div className='bg-bgColor w-full h-full sm:p-6 py-6 px-3'>
                <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
                    <div className='w-full flex flex-col gap-2 text-primary'>
                        <label htmlFor='name' className='text-[17px]'>Name </label>
                        <input 
                        type="text" 
                        placeholder='Enter your name' 
                        id='name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        className='border-2 border-secondary outline-none rounded-xl p-2 bg-gray-300 text-black '
                        />
                    </div>
                    <div className='w-full flex flex-col gap-2 text-primary'>
                        <label htmlFor='email' className='text-[17px]'>Email Address</label>
                        <input 
                        type="text" 
                        placeholder='Enter valid email ID' 
                        id='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
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
                        onChange={e => setPassword(e.target.value)}
                        required
                        className='border-2 border-secondary outline-none rounded-xl p-2 bg-gray-300 text-black '
                        />
                    </div>
                    <div className='w-full flex flex-col gap-2 text-primary'>
                        <label htmlFor='confirmPassword' className='text-[17px]'>Confirm Password</label>
                        <input 
                        type="password" 
                        placeholder='Enter password again' 
                        id='confirmPassword'
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                        className='border-2 border-secondary outline-none rounded-xl p-2 bg-gray-300 text-black '
                        />
                    </div>
                    <div className='flex items-center gap-2 text-sm text-primaryLight font-[100]'>
                        <input type="checkbox"  />
                        <p>Subscribe me to offers and newsletters</p>
                    </div>
                    <div>
                        <button 
                        type='submit' 
                        className="btn-primary py-3 px-20 disabled:cursor-not-allowed" 
                        disabled={loading || !name || !email || !password || !confirmPassword}
                        >
                            { loading ? <ClipLoader size={20} /> : 'Sign Up' }
                        </button>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}

export default Register