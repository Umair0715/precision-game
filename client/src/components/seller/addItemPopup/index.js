import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useSellerContext } from '../../../context/sellerContext'
import Account from './Account'
import Header from './Header'
import Product from './Product'
import Service from './Service'
import { ClipLoader } from 'react-spinners';

const tabs = [
    {
        id : 1 ,
        name : 'Product'
    },
    {
        id : 2 ,
        name : 'Service' 
    },
    {
        id : 3 , 
        name : "Accounts"
    }
]

const AddItemPopup = () => {
    const { setAddItemActiveTab , addItemActiveTab } = useSellerContext();
    const [loading , setLoading] = useState(false);
    const [games , setGames] = useState([]);
    const [selectedGame , setSelectedGame] = useState('');

    useEffect(() => {
        const fetchGames = async () => {
            try {
                setLoading(true);
                const { data : { data : { games } } } = await axios.get('/api/game/all');
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
        <div className='w-full h-screen fixed top-0 left-0 bg-black bg-opacity-50 z-[99] flex items-center justify-center'>
            <div className=' bg-bgColor pb-8 lg:w-1/2 md:w-[60%] sm:w-[70%] w-full'>
                <Header />
                <div className='overflow-auto h-[400px] chatsScroll'>
                    <div className='sm:px-6 px-3 pt-6'>
                        <div className='flex flex-col gap-2 text-primary'>
                            <h5>Category</h5>
                            <div className='border border-primaryLight rounded-md flex items-center w-fit'>
                                {
                                    tabs?.map((tab,i) => (
                                        <div 
                                        key={tab?.id}
                                        className={`py-2 px-4 border-r border-r-primaryLight cursor-pointer
                                        ${tabs?.length - 1 === i ? 'border-none' : ''} 
                                        ${addItemActiveTab === tab?.id ? 'bg-primary text-black font-semibold' : ''}
                                        `}
                                        onClick={() => setAddItemActiveTab(tab?.id)} 
                                        >
                                            {tab?.name}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className='sm:px-6 px-3 pt-6'>
                        {
                            loading 
                            ? 
                                <ClipLoader size={20} color='#fff' />
                            : 
                            games?.length > 0 && 
                                <div className='flex flex-col gap-2 text-primary'>
                                    <h5>Select Game</h5>
                                    <select 
                                    className='border border-primary outline-none rounded-lg py-2 px-3 bg-gray-300 text-black'
                                    onChange={(e) => setSelectedGame(e.target.value)}
                                    >
                                        {
                                            games?.map(game => (
                                                <option key={game?._id} value={game?._id}>
                                                    {game?.name}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                        }
                    </div>
                    <div className='sm:px-6 px-3'>
                        {
                            addItemActiveTab === 1 
                            ? 
                                <Product  
                                selectedGame={selectedGame} 
                                setSelectedGame={setSelectedGame}
                                />
                            : 
                            addItemActiveTab === 2 
                            ? 
                                <Service  
                                selectedGame={selectedGame} 
                                setSelectedGame={setSelectedGame}
                                />
                            : 
                            addItemActiveTab === 3 
                            ? 
                                <Account 
                                selectedGame={selectedGame} 
                                setSelectedGame={setSelectedGame}
                                />
                            : 
                                ''
                        }
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default AddItemPopup