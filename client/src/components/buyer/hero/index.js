import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import './styles.css';
import LazyLoad from 'react-lazyload';
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from 'react-spinners';


const Hero = () => {

    const [loading , setLoading] = useState(false);
    const [games , setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                setLoading(true);
                const { data : { data : { games } } } = await axios.get('/api/game/featured-games');
                setGames(games);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                toast.error(error?.response?.data?.message || 'something went wrong.')
            }
        }
        fetchGames();
    }, [])

    return (
        <div className='md:py-12 pb-12 pt-8'>
            <div className='lg:w-1/2 md:1/3 sm:w-[70%] w-full'>
                <h3 className='text-primary font-bold text-4xl sm:text-5xl'>
                    Featured 
                    <span className='text-secondary'>
                        Games
                    </span>
                </h3>
                <p className='text-primaryLight text-sm mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit pariatur beatae nulla unde delectus dolore eligendi officia repellendus eaque natus.</p>
            </div>
            <div className='w-full h-full flex justify-start'>
                {
                    loading 
                    ? 
                        <ClipLoader size={20} color='#fff' />
                    : 
                    games?.length > 0 
                    ? 
                        <div className='lg:w-[90%] w-full sm:-ml-4 h-full '>
                            <Swiper
                                slidesPerView={1.5}
                                spaceBetween={20}
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[Pagination]}
                                className="mySwiper buyer-home-slider"
                                breakpoints={{
                                    650 : {
                                        slidesPerView : 1.5
                                    } ,
                                    200 : {
                                        slidesPerView : 1
                                    }
                                }}
                            >
                                {
                                    games?.map( game => (
                                        <SwiperSlide key={game?._id}>
                                            <div className='w-full relative'>
                                                <LazyLoad>
                                                    <img 
                                                    src={`/games/${game?.image}`} 
                                                    alt={game?.name} 
                                                    className='rounded-tr-[40px] rounded-bl-[40px] '
                                                    />
                                                </LazyLoad>
                                                <div className='w-full lg:px-8 px-2 text-primaryLight lg:absolute lg:left-1/2 lg:bottom-4 lg:-translate-x-1/2 flex flex-col gap-[4px] lg:mt-0 mt-4'>
                                                    <h5 className='text-primary text-[17px]'>{game?.name}</h5>
                                                    <p className='text-[13px] font-[100]'>{game?.description}</p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                        </div>
                    : 
                        <div className='w-full h-full flex items-center justify-center py-12'>
                            No Featured game found.
                        </div>
                }
            </div>
        </div>
    )
}

export default Hero