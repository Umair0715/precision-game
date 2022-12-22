import './styles.css';
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <footer className='w-full relative z-[10]'>
            <div className='h-[230px]  bg-bgColor z-[-1]'>
                <img src="/images/controller-bg.png" alt="" />
            </div>
            <div className='w-full bg-bgColor pt-8 z-[10] relative'>
                <div className='lg:w-[75%] md:w-[85%] w-full mx-auto grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-4 sm:gap-6 gap-2 g pb-8 md:px-0 sm:px-6 px-2'>
                    <div className='flex  flex-col gap-2 text-white'>
                        <img src="/svgs/logo2.svg" alt="Logo" className='w-[90%] object-cover'/>
                        <p className='text-sm text-gray-200'>Neque aliquet eu, felis gravida. Mauris tincidunt sit vehicula et rhoncus id. Enim vehicula fringilla fames quam orci. Sit et amet.</p>
                        <div className='w-full flex items-center gap-4 mt-4'> 
                            <div className='w-[50px] height-[50px] cursor-pointer hover:-translate-y-2 duration-300 ease-in-out'>
                                <a target='_blank' href="https://www.facebook.com/profile.php?id=100088891630692&mibextid=ZbWKwL">
                                    <img src="/svgs/facebook.svg" alt="" />
                                </a>
                            </div>
                            <div className='w-[50px] height-[50px] cursor-pointer hover:-translate-y-2 duration-300 ease-in-out'>
                                <a target='_blank' href="https://instagram.com/precision.games?igshid=YmMyMTA2M2Y=">
                                    <img src="/svgs/instagram.svg" alt="" />
                                </a>
                            </div>
                            <div className='w-[50px] height-[50px] cursor-pointer hover:-translate-y-2 duration-300 ease-in-out'>
                                <img src="/svgs/linkdin.svg" alt="" />
                            </div>
                            <div className='w-[50px] height-[50px] cursor-pointer hover:-translate-y-2 duration-300 ease-in-out'>
                                <img src="/svgs/pinterest.svg" alt="" />
                            </div>
                            <div className='w-[50px] height-[50px] cursor-pointer hover:-translate-y-2 duration-300 ease-in-out'>
                                <img src="/svgs/twitter.svg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col md:items-center gap-6 mt-12 text-white'>
                        <div className='text-xl font-semibold uppercase'>
                            <h5>Quick Links</h5>
                        </div>
                        <ul className='quickLinksList flex flex-col gap-1.5 text-[15px]'>
                            <li>
                                <a href='#about'>
                                    About us
                                </a>
                            </li>
                            <li>
                                <a href='#services'>
                                    Services
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* <div className='flex flex-col gap-6 mt-12 text-white'>
                        <div className='text-xl font-semibold'>
                            <h5>NEWSLETTER</h5>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <form className='flex flex-col gap-2'>
                                <input 
                                type="email"
                                required 
                                placeholder='Enter email address' 
                                className='p-2 border-none outline-none text-black'
                                />
                                <button 
                                type='submit'
                                className='bg-secondary py-2 px-6 w-fit text-black hover:bg-primary'
                                >
                                    SUBSCRIBE
                                </button>
                            </form>
                            <span className='text-sm text-gray-200'>We never span you!</span>
                        </div>
                    </div> */}
                    <div className='flex  flex-col gap-6 mt-12 text-white xl:ml-12'>
                        <div className='text-xl font-semibold uppercase'>
                            <h5>CONTACT</h5>
                        </div>
                        <div className='text-sm text-gray-200 flex flex-col gap-2'>
                            <p>25, Abc street, Pakistan</p>
                            <a href='tel:123-12345678'>Phone: 123-12345678</a>
                            <a href='mailto:info@gamescollection.com'>info@gamescollection.com</a>
                        </div>
                    </div>
                </div>
                <div className='w-full bg-black py-6 sm:text-sm text-xs'>
                    <div className='sm:w-[75%] w-full sm:px-0 px-2 mx-auto text-gray-400 flex items-center sm:justify-between justify-center'>
                        <div className='items-center gap-8 sm:flex hidden'>
                            <Link to='#'>
                                Terms of Use
                            </Link>
                            <Link to='/privacy-policy'>
                                Privacy Policy
                            </Link>
                        </div>
                        <p>© 2022 Keybotix Software Solutions, Pakistan</p>
                    </div>
                </div>
                <div className='w-full bg-secondary py-8'>
                </div>  
            </div>
        </footer>
    )
}

export default Footer