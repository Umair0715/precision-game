import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BuyerNav from '../../components/buyer/navbar';
import Footer from '../../components/footer';
// import { useBuyerContext } from '../../context/buyerContext';
import Table from './Table';


const Cart = () => {
    // const { setShowBuyerPopup , setBuyerActivePopup } = useBuyerContext();
    // const { cartItems } = useSelector(state => state.cart);
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        if(!user){
            navigate('/?login=true')
        }else if(user?.role !== 1){
            navigate(user?.role === 2 ? '/seller' : user?.role === 3 ? '/admin/dashboard' : '/?login=true' )
        }
    }, [user,navigate])

    // const handleCheckoutClick = () => {
    //     setShowBuyerPopup(true);
    //     setBuyerActivePopup(1);
    // }

    return (
        <div className='buyer-purchases-wrapper pb-10'>
            <div className='lg:ml-[25%] md:py-10 pb-10 pt-4'>
                <div className='px-2'>
                    <BuyerNav />
                </div>
                <div className='lg:mt-20 mt-12'>
                    <div className='lg:px-0 sm:px-4 px-2'>
                        <h3 className='text-4xl sm:text-5xl font-bold text-primary'>My Shopping
                            <span className='text-secondary'>Cart</span>
                        </h3>
                        <p className='text-primaryLight text-sm mt-3 md:w-1/2 sm:w-[80%] w-[90%]'>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates officia architecto nemo reprehenderit ratione eveniet.
                        </p>
                    </div>
                </div>
                <div className='mt-8 lg:mr-12 bg-bgColor shadow-1'>
                    <Table />
                </div>
                {/* {
                    cartItems?.length > 0  && 
                    <div className='mt-8 md:pr-12 pr-2 flex justify-end'>
                        <button 
                        className="btn-primary py-3 px-12 uppercase"
                        onClick={handleCheckoutClick}
                        >
                            Checkout
                        </button>
                    </div>
                } */}
            </div>
            <div className='mt-12'>
                <Footer />
            </div>
        </div>
    )
}

export default Cart;