import Sidebar from '../../../components/dashboard/sidebar'
import { useAdminContext } from '../../../context/adminContext';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from "react";
import { checkAdmin } from "../../../utils/redirectTo";
import axios from 'axios';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import LazyLoad from 'react-lazyload';
import Pagination from './Pagination';


const Games = () => {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth)
    const [loading ,setLoading] = useState(false);
    const { showAdminDrawer , setShowAdminDrawer , setShowAdminPopup , setAdminActivePopup , games , setGames } = useAdminContext();
    const [pages , setPages] = useState(1);
    const [currentPage , setCurrentPage] = useState(1);
    const [deleteLoading , setDeleteLoading] = useState(false);

    
    useEffect(() => {
        checkAdmin(navigate , user);
    }, [user, navigate]);

    const handleClick = () => {
        setAdminActivePopup(4);
        setShowAdminPopup(true);
    }

    const fetchGames = useCallback( async (pageNumber = 1) => {
            setLoading(true);
            try {
                const { data : { data : { games , pages , page } } } = await axios.get(`/api/game/all?pageNumber=${pageNumber}`);
                setGames(games);
                setPages(pages);
                setCurrentPage(page);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                toast.error(error?.response?.data?.message || 'something went wrong.')
            }
    }, [setGames])
    useEffect(() => {
        fetchGames();
    }, [fetchGames]);

    const deleteGame = async (game) => {
        if(window.confirm('Are you sure. you want to delete this game?')){
            try {
                setDeleteLoading(true);
                await axios.delete(`/api/game/delete-game/${game?._id}`);
                setGames(prev => prev.filter(g => g?._id !== game?._id));
                toast.success('Game Delete Successfully.');
                setDeleteLoading(false);
            } catch (error) {
                setDeleteLoading(false);
                toast.error(error?.response?.data?.message || 'something went wrong.')
            }
        }
        return;
    }

    return (
        <div className='w-full min-h-screen h-full flex'>
             <div className={`fixed top-0 md:left-0  duration-300 ease-in-out ${showAdminDrawer ? 'left-0' : '-left-full'} w-[250px] h-screen z-[999]`}>
                <Sidebar />
            </div>
            <div className='w-full bg-bgColor md:ml-[250px] py-6 px-4'>
                <div className='text-4xl text-primary flex items-center justify-between sm:px-0 px-2'>
                    <h3>All Games</h3>
                    <div className='md:hidden flex text-4xl text-secondary cursor-pointer'
                    onClick={() => setShowAdminDrawer(true)}>
                        <i className="uil uil-bars"></i>
                    </div>
                </div>
                <div className='mt-8'>
                    <button className="btn-primary py-3 sm:px-8 px-4" 
                    onClick={handleClick}>
                        Create Game
                    </button>
                </div>

                {
                    loading 
                    ? 
                        <div className='w-full h-full flex items-center justify-center py-12'>
                            <ClipLoader size={25} color='#fff' />
                        </div>
                    : 
                        <>
                            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-8 py-6 px-4'>
                                {
                                    games?.map(game => (
                                        <div className='bg-black bg-opacity-70 rounded-tr-[30px] rounded-bl-[30px] ' key={game?._id}>
                                            <div className='w-full flex justify-end px-6 pt-4'>
                                                <button className="btn-secondary py-2 px-5 text-sm"
                                                title='Delete Game'
                                                onClick={() => deleteGame(game)}
                                                disabled={deleteLoading}
                                                >
                                                    {deleteLoading ? 'Loading...' : 'Delete'}
                                                </button>
                                            </div>
                                            <div className='px-6 py-2 mt-4'>
                                                <LazyLoad>
                                                    <img src={`/games/${game?.image}`} alt={game?.name} className='rounded-tr-[30px] rounded-bl-[30px] w-full lg:h-[200px] md:h-[250px] h-[280px] object-cover'/>
                                                </LazyLoad>
                                            </div>
                                            <div className='px-6 py-4 text-primary '>
                                                <h5 className='uppercase font-semibold'>{game?.name}</h5>
                                                <p className='text-primaryLight text-xs'>{game?.description}</p>
                                            </div>
                                        
                                        </div>
                                    ))
                                }
                            </div>
                            <Pagination
                            pages={pages} 
                            currentPage={currentPage} 
                            fetchGames={fetchGames}
                            />
                        </>
                }
                
            </div>
        </div>
    )
}

export default Games;