import './styles.css';
import Hero from '../../components/buyer/hero';
import BuyerNav from '../../components/buyer/navbar';
import Purchases from '../../components/buyer/purchases';
import Trendings from '../../components/buyer/trendings';
import Footer from '../../components/footer';
import { useProductContext } from '../../context/productContext';
import ProductDetailsPopup from '../../components/productDetailsPopup';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


const Buyer = () => {
    const { showProductDetailsPopup } = useProductContext();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        if(!user){
            navigate('/?login=true')
        }else if(user?.role !== 1){
            navigate(user?.role === 2 ? '/seller' : user?.role === 3 ? '/admin/dashboard' : '/?login=true' )
        }
    }, [user , navigate])

    return (
        <div className='buyer-wrapper'>
            <section className='buyer-bg buyer-hero md:py-10 py-4'>
                <div className='lg:ml-[25%] md:px-8 sm:px-4 px-2'>
                    <BuyerNav />
                    <Hero />
                </div>
            </section>
            <section className='buyer-bg buyer-trendings'>
                <div className='lg:ml-[25%] lg:pr-24 pb-12'>
                    <Trendings />
                </div>
            </section>
            <section className='lg:min-h-screen h-full buyer-purchases'>
                <div className='lg:ml-[25%] lg:pr-24 px-4 pb-12'>
                    <Purchases />
                </div>
            </section>
            <div>
                <Footer />
            </div>
            {
                showProductDetailsPopup && <ProductDetailsPopup />
            }
        </div>
    )
}

export default Buyer