import './styles.css';
import BuyerNav from '../../components/buyer/navbar';
import PurchaseTable from '../../components/buyerPurchases/table';
import Footer from '../../components/footer';
import { useDispatch , useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getMyOrders } from '../../redux/actions/orderActions';
import { CLEAR_ERRORS } from '../../redux/constants/orderConstants';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const BuyerPurchases = () => {
    const dispatch = useDispatch();
    const { ordersError  } = useSelector(state => state.orders)
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        if(!user){
            navigate('/?login=true')
        }else if(user?.role !== 1){
            navigate(user?.role === 2 ? '/seller' : user?.role === 3 ? '/admin/dashboard' : '/?login=true' )
        }
    }, [user, navigate])

    useEffect(() => {
        dispatch(getMyOrders('/my'));
    }, [dispatch])

    useEffect(() => {
        if(ordersError){
            toast.error(ordersError);
            dispatch({ type : CLEAR_ERRORS })
        }
    }, [ordersError , dispatch])

    return (
        <div className='buyer-purchases-wrapper pb-10'>
            <div className='lg:ml-[25%] lg:px-0  md:py-10 pb-10 pt-4'>
                <div className='px-2'>
                    <BuyerNav />
                </div>
                <div className='lg:mt-20 mt-12 lg:px-0 sm:px-4 px-2'>
                    <div>
                        <h3 className='text-4xl sm:text-5xl font-bold text-primary'>My 
                            <span className='text-secondary'>Purchase</span>
                        </h3>
                        <p className='text-primaryLight text-sm mt-3 sm:w-1/2'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates officia architecto nemo reprehenderit ratione eveniet.</p>
                    </div>
                </div>
                <div className='mt-8 lg:mr-12 bg-bgColor shadow-1'>
                    <PurchaseTable />
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default BuyerPurchases;