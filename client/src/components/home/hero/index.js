import { useAuthContext } from '../../../context/authContext';

const Hero = () => {
    const { setShowAuthPopup , setCurrentAuthPopup , setUserData , userData } = useAuthContext();

    const handleClick = (role) => {
        setShowAuthPopup(true);
        setCurrentAuthPopup(2);
        setUserData({...userData , role })
    }

    return (
        <div className='w-full flex md:flex-row flex-col mt-12 justify-between gap-4 '
            style={{
                minHeight : 'calc(100vh - 88px)',
                height : '100%'
            }}
        >
            <div className='heroLeft flex-1 flex flex-col gap-8 '>
                <h1 className='text-5xl font-bold text-primary leading-[1.2]'>
                    Ultimate
                     <br /> 
                    <span className='text-secondary'>Marketplace</span> 
                    <br /> 
                    for Gaming
                    
                </h1>
                <p className='text-primaryLight text-[15px]'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ultricies aliquet nisl magna. Magna orci risus at pretium. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ultricies aliquet nisl magna. Magna orci risus at pretium.
                </p>
                <div className='flex items-center gap-8'>
                    <button className='btn-primary py-3 lg:px-8 px-4'
                    onClick={() => handleClick(2)}
                    >
                        JOIN AS SELLER
                    </button>
                    <button className='btn-primary py-3 lg:px-8 px-4'
                    onClick={() => handleClick(1)}
                    >
                        JOIN AS BUYER
                    </button>
                </div>
            </div>
            <div className='heroRight flex-1 ml-4 flex md:items-start items-center justify-center md:pt-0 md:pb-0 md:pr-0 pr-4 pb-16 pt-8'>
                <img src="/images/hero-image.png" alt="Hero" />
            </div>
        </div>
    )
}

export default Hero