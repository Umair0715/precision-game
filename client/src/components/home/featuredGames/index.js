import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import './styles.css';
import LazyLoad from 'react-lazyload';
import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';


const Featured = () => {
    const [games , setGames] = useState([]);
    const [loading , setLoading] = useState(false);


    useEffect(() => {
        const fetchGames = async () => {
            setLoading(true);
            try {
                const { data : { data : { games : _games } } } = await axios.get('/api/game/featured-games');
                setGames(_games)
                setLoading(false);
            } catch (error) {
                setLoading(false);
                toast.error(error?.response?.data?.message || 'something went wrong.')
            }
        }
        fetchGames();
    }, [])

    return (
        <div className='py-8 w-full min-h-[80vh] sm:min-h-screen h-full relative' >
            <div className='w-full flex items-center justify-center relative '>
                <h3 className='text-4xl font-bold capitalize text-primary'>
                Featured  <span className='text-secondary ml-2'>Games</span>
                </h3>
            </div>
            {
                loading 
                ? 
                    <ClipLoader size={20} color='#fff' />
                : 
                games?.length > 0 
                ? 
                    <div className='w-full h-full flex justify-end'>
                        <div className='w-full md:px-0 sm:px-4 lg:w-[74%] h-full '>
                            <Swiper
                                slidesPerView={1.5}
                                
                                spaceBetween={20}
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[Pagination]}
                                className="mySwiper featuredSwiper"
                                breakpoints={{
                                    768 : {
                                        slidesPerView : 1.5
                                    }, 
                                    280 : {
                                        slidesPerView : 1
                                    }
                                }}
                            >
                                {
                                    games?.map( game => (
                                        <SwiperSlide key={game?._id}>
                                            <div className='w-full relative md:block flex flex-col gap-4'>
                                                <LazyLoad>
                                                    <img 
                                                    src={`/games/${game?.image}`} 
                                                    alt={game?.name} 
                                                    className='rounded-tr-[40px] rounded-bl-[40px] '
                                                    />
                                                </LazyLoad>
                                                <div className='w-full sm:px-8 px-2 text-primaryLight md:absolute md:left-1/2 md:bottom-4 md:-translate-x-1/2 flex flex-col gap-[4px]'>
                                                    <h5 className='text-primary text-[17px]'>{game?.name}</h5>
                                                    <p className='text-[13px] font-[100]'>{game?.description}</p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                        </div>
                    </div>
                : 
                    <div className='w-full h-full flex items-center justify-center py-2'>
                        No Featured Game created yet.
                    </div>
            }
        </div>
    )
}

export default Featured;