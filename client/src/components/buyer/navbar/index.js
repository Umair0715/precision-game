import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../context/authContext';

const BuyerNav = () => {
    const { setShowDrawer } = useAuthContext();

    return (
        <div >
            <div className='hidden md:flex items-center justify-between lg:pr-20 '>
                <div>
                    <ul className='flex items-center gap-12 text-secondary'>
                        <li className='hover:text-primary'>
                            <Link to='/buyer'>
                                Featured
                            </Link>
                        </li>
                        <li className='hover:text-primary'>
                            <Link to='/buyer/purchase'>
                                My Purchase
                            </Link>
                        </li>
                        <li className='hover:text-primary'>
                            <Link to='/cart'>
                                Cart
                            </Link>
                        </li>
                        <li className='hover:text-primary'>
                            <Link to='/chat'>
                                Chat
                            </Link>
                        </li>
                        <li className='hover:text-primary'>
                            <Link to='/chat-support'>
                                Customer Support
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <button className="btn-secondary py-2 px-6 uppercase">
                        <Link to='/subscribe'>
                            Subscribe
                        </Link>
                    </button>
                </div>
            </div>
            <div className='md:hidden flex items-center justify-between'>
                <div>
                    <img src="/svgs/logo.svg" alt="Logo" />
                </div>
                <div className='text-4xl text-secondary cursor-pointer' onClick={() => setShowDrawer(true)}>
                    <i className="uil uil-bars"></i>
                </div>
            </div>
        </div>
    )
}

export default BuyerNav;