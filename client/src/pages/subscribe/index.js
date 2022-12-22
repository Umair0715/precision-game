import './styles.css';
import BuyerNav from '../../components/buyer/navbar';
import Footer from '../../components/footer';
import AllPackages from '../../components/allPackages';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const Subscribe = () => {
    const [mySubscription , setMySubscription] = useState('');

    const fetchMySubScription = async () => {
        try {
            const { data : { data : { subscription } } } = await axios.get('/api/subscription/my');
            setMySubscription(subscription)
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || 'something went wrong.')
        }
    }

    useEffect(() => {
        fetchMySubScription();
    }, [])

    return (
        <div className='bg-img subscribe-wrapper lg:px-0  '>
            <div className='lg:ml-[25%] pb-28 sm:px-4 px-2'>
                <div className='md:py-10 pt-4'>
                    <BuyerNav />
                </div>
                <div>
                    <div className='my-12'>
                        <h3 className='text-4xl sm:text-5xl font-bold text-primary'>Subscribe to <span className='text-secondary'>Get Benefits</span></h3>
                        <p className='text-sm text-primaryLight mt-3 md:w-1/2 sm:w-[80%] w-[90%]'>Lorem ipsum dolor sit amet consectetur. Placerat lacus lectus dolor integer eget cursus volutpat sed gravida. Molestie commodo mattis eu vel sit.</p>
                    </div>
                    <AllPackages mySubscription={mySubscription} />
                   
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Subscribe