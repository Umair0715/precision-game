import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import './styles.css';
import { useEffect } from "react";
import { useSelector , useDispatch } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { getMyOrders } from "../../../redux/actions/orderActions";
import { toast } from "react-toastify";
import { CLEAR_ERRORS } from "../../../redux/constants/orderConstants";
import LazyLoad from 'react-lazyload';

const Purchases = () => {
    const dispatch = useDispatch();
    const { ordersList , loading , ordersError } = useSelector(state => state.orders)

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
        <div className='py-6 '>
            <div className='mt-8'>
                <h3 className='text-4xl sm:text-5xl font-bold text-primary'>
                    My <span className='text-secondary'>Purchases</span>
                </h3>
            </div>
            {
                loading 
                ? 
                    <div>
                        <ClipLoader size={25} color='#fff' />
                    </div>
                : 
                ordersList?.length > 0
                ? 
                    <div className='w-[100%] h-full '>
                        <Swiper
                            slidesPerView={3}
                            spaceBetween={40}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[Pagination]}
                            className=" purchases-swiper"
                            breakpoints={{
                                800 : {
                                    slidesPerView : 3 ,
                                },
                                600 : {
                                    slidesPerView : 2
                                },
                                200 : {
                                    slidesPerView : 1 
                                }
                            }}
                        >
                            {
                                ordersList?.map( order => (
                                    <SwiperSlide key={order?._id}>
                                    <div>
                                            <div className='w-full relative '>
                                                <LazyLoad>
                                                    <img 
                                                    src={`/products/${order?.orderItem?.image}`} 
                                                    alt={order?.orderItem?.title} 
                                                    className='rounded-tr-[40px] rounded-bl-[40px] z-20 relative object-cover'
                                                    />
                                                </LazyLoad>
                                                <div className='absolute w-full h-full -top-4 -left-4 bg-yellow-300 z-[-1] bg-opacity-40 rounded-tr-[40px] rounded-bl-[40px]'></div>
                                            </div>
                                            <div className='mt-4 flex flex-col gap-1 text-primary'>
                                                <h5 className='uppercase font-semibold'>{order?.orderItem?.title}</h5>
                                                <p className='text-sm text-primaryLight'>{order?.orderItem?.description}</p>
                                            </div>
                                    </div>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </div>
                : 
                    <div className='w-full h-full py-12 text-4xl font-semibold text-gray-400 flex items-center justify-center'>You have not purchased any item yet.</div>

            }
        </div>
    )
}

export default Purchases;