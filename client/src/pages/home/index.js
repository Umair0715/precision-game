import AuthPopup from '../../components/auth/popup';
import Footer from '../../components/footer';
import About from '../../components/home/about';
import Featured from '../../components/home/featuredGames';
import Hero from '../../components/home/hero';
import Services from '../../components/home/services';
import './styles.css';
import Navbar from '../../components/navbar';
import { useAuthContext } from '../../context/authContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { redirectTo } from '../../utils/redirectTo';

const Home = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const { token } = useParams();
    const { showAuthPopup , setShowAuthPopup , setCurrentAuthPopup } = useAuthContext();
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        if(token){
            setShowAuthPopup(true);
            setCurrentAuthPopup(4);
        }
    }, [token , setShowAuthPopup , setCurrentAuthPopup]);

    useEffect(() => {
        if(user){
            redirectTo(navigate , user);
        }
    }, [user, navigate]);

    
    useEffect(() => {
        if(location.search === '?login=true'){
            setShowAuthPopup(true);
            setCurrentAuthPopup(1)
        }
    }, [location.search , setShowAuthPopup , setCurrentAuthPopup])



    return (
       <div className='homeWrapper '>
            <div className='bg heroWrapper'>
                <section className='hero-section mx-auto'>
                    <Navbar />
                    <Hero />
                </section>
                <section className='services-section mx-auto' id='services'>
                    <Services />
                </section>
            </div>
            <section className='bg featuredGamesWrapper'>
                <div className='w-full'>
                    <Featured />    
                </div>
            </section>
            <section className='aboutWrapper flex items-center justify-center' id='about'>
                <div className='lg:w-[55%] md:w-[75%] w-[95%] h-full mx-auto'>
                    <About />
                </div>          
            </section>
            <Footer />
            {
                showAuthPopup && <AuthPopup />
            }
       </div>
    )
}

export default Home