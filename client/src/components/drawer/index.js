import './styles.css';
import { useAuthContext } from '../../context/authContext';
import useClickOutside from '../../helpers/clickOutside';
import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { logout } from '../../redux/actions/authActions';

const Drawer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const drawerRef = useRef(null);
    const { showDrawer , setShowDrawer , setShowAuthPopup , setCurrentAuthPopup  } = useAuthContext();
    const { user } = useSelector(state => state.auth)


    useClickOutside(drawerRef , () => {
        setShowDrawer(false);
    });


    const logoutHandler = () => {
        dispatch(logout(navigate));
        setShowDrawer(false);
    }

    const loginClickHandler = () => {
        setShowDrawer(false);
        setShowAuthPopup(true);
        setCurrentAuthPopup(1);
    }

    return (
        <div className='lg:hidden block relative z-[9999999]'>
            <div className={`fixed top-0 left-0 w-full h-screen bg-black bg-opacity-60 ${showDrawer ? 'block' : 'hidden'} duration-300 ease-in-out`}>
            </div>
            <div ref={drawerRef} className={`drawer ${showDrawer ? 'show' : ''} `}>
                <div className='py-4 px-2'>
                    <div className='absolute right-1 top-1 text-3xl cursor-pointer' onClick={() => setShowDrawer(false)}>
                        <i className="uil uil-times"> </i>
                    </div>
                    <div className='flex justify-center border-b border-b-secondary pb-4 mt-4'>
                        <img src="/svgs/logo.svg" alt="Logo" />
                    </div>
                    <div className='mt-4 text-center font-medium'>
                        <ul className='flex flex-col gap-4'>      
                            {
                                user && user?.role === 1 &&
                                <>
                                    <li>
                                        <Link to='/buyer' 
                                        onClick={() => setShowDrawer(false)}
                                        >
                                            Featured
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/buyer/purchase'
                                        onClick={() => setShowDrawer(false)}
                                        >
                                            My Purchases
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/cart' 
                                        onClick={() => setShowDrawer(false)}
                                        >
                                            Cart
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/chat'
                                        onClick={() => setShowDrawer(false)}
                                        >
                                            Chat
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/chat-support' 
                                        onClick={() => setShowDrawer(false)}
                                        >
                                            Customer Support
                                        </Link>
                                    </li>
                                    
                                </>     
                            }
                            {
                                user 
                                ? 
                                    <>
                                        <li>
                                            <p  
                                            className='cursor-pointer'
                                            onClick={logoutHandler}
                                            >
                                                Logout
                                            </p>
                                        </li>
                                    </>
                                : 
                                <>
                                    <li>
                                        <p  
                                        className='cursor-pointer'
                                        onClick={loginClickHandler}
                                        >
                                            Login
                                        </p>
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Drawer;