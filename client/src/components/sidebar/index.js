import './styles.css';
import { useAuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/authActions';

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setShowAuthPopup , setCurrentAuthPopup} = useAuthContext();
    const { user } = useSelector(state => state.auth)

    const handleClick = (value) => {
        setShowAuthPopup(true);
        setCurrentAuthPopup(value);
    }

    const logoutHandler = () => {
        dispatch(logout(navigate));
    }

    return (
        <div className='sidebar fixed top-0 left-0 w-[100px] h-screen bg-primary py-4 px-4 flex flex-col items-center gap-8 z-[20]'>
            <div className=''>
                <img 
                src='/svgs/logo.svg' 
                alt='Logo' 
                className='w-full h-full object-cover cursor-pointer'
                onClick={() => navigate('/')}
                />
            </div>
            <div className='font-semibold uppercase flex flex-col gap-4 text-center'>
                {
                    user 
                    ? 
                        <p 
                        className='cursor-pointer' 
                        onClick={logoutHandler}
                        >
                            Logout
                        </p>
                    : 
                        <p 
                        className='cursor-pointer' 
                        onClick={() => handleClick(1)}
                        >
                            LOGIN
                        </p>
                }
            </div>
        </div>
    )
}



export default Sidebar