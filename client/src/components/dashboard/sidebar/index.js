import './styles.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAdminContext } from '../../../context/adminContext';
import useClickOutside from '../../../helpers/clickOutside';
import { logout } from '../../../redux/actions/authActions';
import { useDispatch } from 'react-redux';


const Sidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sidebarRef = useRef(null);
    const location = useLocation();
    const { setShowAdminDrawer , showAdminDrawer } = useAdminContext();

    useClickOutside(sidebarRef , () => {
        setShowAdminDrawer(false);
    })

    return (
        <>
        <div className={`fixed top-0 left-0 bg-black bg-opacity-70 w-full h-screen md:hidden duration-300 ease-in-out ${showAdminDrawer ? 'flex' : 'hidden'} `}>

        </div>
        <div className='z-[9999] flex flex-col gap-4 bg-gradient  relative w-full h-full py-3'
        ref={sidebarRef}>
            
            <div className='md:hidden block absolute top-0 right-0 text-4xl cursor-pointer '
            onClick={() => setShowAdminDrawer(false)}>
                <i className="uil uil-times"></i>
            </div>
            <div className='w-full flex items-center justify-center'>
                <img src="/images/logo.png" alt="Logo" className='w-[100px] '/>
            </div>
            <div className='mt-0'>
                <ul className='dash-sidebar-list'>
                    <li className={`${location?.pathname === '/admin/dashboard' ? 'active' : ''}`}>
                        <Link to='/admin/dashboard'>
                            <i className="uil uil-home"></i>
                            <p>Dashboard</p>
                        </Link>
                    </li>
                    <li className={`${location?.pathname === '/admin/products' ? 'active' : ''}`}>
                        <Link to='/admin/products'>
                            <i className="uil uil-clipboard-notes"></i>
                            <p>Products</p>
                        </Link>
                    </li>
                    <li className={`${location?.pathname === '/admin/buyers' ? 'active' : ''}`}>
                        <Link to='/admin/buyers'>
                            <i className="uil uil-user-check"></i>
                            <p>Buyers</p>
                        </Link>
                    </li>
                    <li className={`${location?.pathname === '/admin/sellers' ? 'active' : ''}`}>
                        <Link to='/admin/sellers'>
                            <i className="uil uil-user-plus"></i>
                            <p>Sellers</p>
                        </Link>
                    </li>
                    <li className={`${location?.pathname === '/admin/orders' ? 'active' : ''}`}>
                        <Link to='/admin/orders'>
                            <i className="uil uil-create-dashboard"></i>
                            <p>Orders</p>
                        </Link>
                    </li>
                    <li className={`${location?.pathname === '/admin/games' ? 'active' : ''}`}>
                        <Link to='/admin/games'>
                            <i className="uil uil-basketball"></i>
                            <p>Games</p>
                        </Link>
                    </li>
                    <li className={`${location?.pathname === '/admin/packages' ? 'active' : ''}`}>
                        <Link to='/admin/packages'>
                            <i className="uil uil-package"></i>
                            <p>Packages</p>
                        </Link>
                    </li>
                    <li className={`${location?.pathname === '/admin/chat' ? 'active' : ''}`}>
                        <Link to='/admin/chat'>
                            <i className="uil uil-comment-edit"></i>
                            <p>Support Chat</p>
                        </Link>
                    </li>
                    <li className={`${location?.pathname === '/admin/settings' ? 'active' : ''}`}>
                        <Link to='/admin/settings'>
                            <i className="uil uil-setting"></i>
                            <p>Settings</p>
                        </Link>
                    </li>
                    <li onClick={() => dispatch(logout(navigate))}>
                        <i className="uil uil-sign-out-alt text-xl"></i>
                        <p>Logout</p>
                    </li>
                    
                </ul>
            </div>
        </div>
        </>
    )
}

export default Sidebar