import './styles.css';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';

const Navbar = () => {
    const { setShowDrawer } = useAuthContext();

    return (
        <nav className='lg:py-8 pt-4 flex items-center justify-between'>
            <ul className='flex items-center gap-8'>
                <li className='text-base text-secondary hover:text-primary'>
                    <Link to='/'>
                        Home
                    </Link>
                </li>
            </ul>
            <div className='lg:hidden text-4xl text-secondary cursor-pointer'
            onClick={() => setShowDrawer(true)}>
                <i className="uil uil-bars"></i>
            </div>
        </nav>
    )
}

export default Navbar