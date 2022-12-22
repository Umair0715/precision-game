import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PaymentSuccess = () => {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        if(!user){
            navigate('/?login=true');
        }else if(user?.role !== 1){
            navigate(user?.role === 2 ? '/seller' : user?.role === 3 ? '/admin/dashboard' : '/?login=true' );
        }
    }, [user , navigate]);
    
    useEffect(() => {
        const currentOrder = JSON.parse(localStorage.getItem('currentOrder'));
        if(currentOrder){
            let cartItems = JSON.parse(localStorage.getItem('cartItems'));
            localStorage.setItem('cartItems', JSON.stringify(cartItems.filter(item => item?._id !== currentOrder?._id)));
            localStorage.setItem('currentOrder' , JSON.stringify({}));
        }
    }, [])

    return (
        <div className='w-full h-screen flex items-center justify-center flex-col gap-3'>
            <p>PaymentSuccess</p>
            <button className='btn-primary' onClick={() => navigate('/buyer')}>Back to home</button>
        </div>
    )
}

export default PaymentSuccess;