import './styles.css';
import { useState } from 'react';
import { data } from './data';
import LazyLoad from 'react-lazyload';
import { useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';

const Services = () => {
    const [loading , setLoading] = useState(false);
    const [services , setServices] = useState([]);
    const [activeService , setActiveService] = useState();

    const fetchServices = async () => {
        setLoading(true);
        try {
            const { data : { data : { services : _services } } } = await axios.get('/api/random-services');
            setServices(_services);
            setActiveService(_services[0]);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log('fetch services error' , error);
        }
    }

    useEffect(() => {
        fetchServices();
    }, []);


    return (
        <div className='py-8 w-full min-h-screen h-full' >
            <div className='w-full flex items-center justify-center relative '>
                <h3 className='text-4xl font-bold capitalize text-primary'>
                    Our <span className='text-secondary ml-2'>Services</span>
                </h3>
                <div className='absolute left-[21%] -top-8 md:block hidden '>
                    <img src="/images/pattern-small.png" alt="Pattern" />
                    <img src="/images/pattern-small.png" alt="Pattern" className='mt-1 ' />
                </div>
            </div>
            {
                loading 
                ? 
                    <ClipLoader size={20} color='#fff' />
                : 
                services?.length > 0 
                ? 
                <div className='w-full h-full flex md:pt-16 pt-10 md:flex-row flex-col md:gap-0 gap-16'>
                    <div className=' flex-1 md:flex-[0.35] flex-col gap-4 relative z-50 md:flex hidden '>
                        {
                            services?.map(service => (
                                <button 
                                key={service?._id}
                                className={`services-tab-btn ${activeService?._id === service?._id ? 'btn-primary scale-110' : 'btn-secondary '} text-xl uppercase`}
                                onClick={() => setActiveService(service)}
                                >
                                    {service?.title}
                                </button>
                            ))
                        }
                    </div>
                    <div className='md:hidden flex gap-4 items-center justify-center  '>
                        {
                            services?.map(service => (
                                <p 
                                key={service?._id}
                                className={`${activeService?._id === service?._id ? 'text-primary' : 'text-secondary'} sm:text-sm text-xs  capitalize`}
                                onClick={() => setActiveService(service)}
                                >
                                    {service?.title}
                                </p>
                            ))
                        }
                    </div>
                    <div className=' md:flex-[0.65] flex flex-col gap-8  md:-ml-10 -mt-4 relative z-10 '>
                        <div>
                            <LazyLoad>
                                <img className='w-full h-full object-cover rounded-tr-[40px] rounded-bl-[40px]' src={`/products/${activeService?.image}`} alt={activeService?.title} />
                            </LazyLoad>
                        </div>
                        <p className='text-primaryLight text-[15px]'>
                            {activeService?.description}
                        </p>
                    </div>

                </div>
                : 
                    <div className='w-full h-full flex items-center justify-center text-gray-400 font-semibold text-3xl py-12'>
                        No Service created yet.
                    </div>
            }
        </div>
    )
}

export default Services