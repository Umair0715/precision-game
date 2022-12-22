import { useAuthContext } from '../../../context/authContext';
import ForgotPassword from '../forgotPassword';
import Login from '../login';
import Register from '../register';
import ResetPassword from '../resetPassword';

const AuthPopup = () => {
    const { currentAuthPopup } = useAuthContext();


    return (
        <div className='w-full h-screen fixed top-0 left-0 bg-black bg-opacity-50 z-[99] flex items-center justify-center'>
            {
                currentAuthPopup === 1 
                ? 
                    <Login />
                : 
                currentAuthPopup === 2 
                ? 
                    <Register />
                : 
                currentAuthPopup === 3 
                ? 
                    <ForgotPassword />
                : 
                currentAuthPopup === 4 
                ? 
                    <ResetPassword />
                : 
                    ''
            }
        </div>
    )
}

export default AuthPopup;