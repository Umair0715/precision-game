import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/actions/cartActions';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { useChatContext } from '../../context/chatContext';
import { createChat } from '../../utils/chats';
import { useNavigate } from 'react-router-dom';


const Table = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart);
    // let cartItems = JSON.parse(localStorage.getItem('cartItems'));
    const { user } = useSelector(state => state.auth)
    const [loading , setLoading] = useState(false);
    const [chatLoading , setChatLoading] = useState(false);
    const { setSelectedChat } = useChatContext();

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id,toast));
    }

    const buyNowHandler = async (item) => {
        try {
            setLoading(true);
            const { data : { data : { url } } } = await axios.post('/api/stripe/create-checkout-session' , { orderItem : item , userId : user?._id}, {
                headers : {
                    'content-type' : 'application/json'
                }
            });
            if(url){
                window.location.href = url;
            }
            localStorage.setItem('currentOrder' , JSON.stringify(item))
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const chatNowHanlder = async (item) => {
        try {
            setChatLoading(true);
            const chat = await createChat(item?.seller?._id);
            setSelectedChat(chat);
            navigate(`/chat/${item?._id}`);
            setChatLoading(false);
        } catch (err) {
            setChatLoading(false);
            toast.error(err?.response?.data?.message || 'something went wrong.')
        }
    }


    return (
        <div className='overflow-x-auto pb-12'> 
            <div className='w-full flex items-center justify-between border-b border-b-primary p-4'>
                <div>
                    <div className='flex items-center gap-2'>
                        <h5 className='text-[17px] font-semibold text-secondary'>Cart</h5>
                        <div className='bg-primary py-1 px-3 rounded-full text-xs text-black'>
                            12 items
                        </div>
                    </div>
                    <p className='text-sm text-primaryLight'>Select the products to purchase and move ahead</p>
                </div>
            </div>
            <div>
                
                    {
                        cartItems?.length > 0 
                        ? 
                        <table className="w-full text-sm text-left text-secondary ">
                            <thead className="text-sm text-secondary border-b border-b-primary ">
                                <tr className=''>
                                    <th scope="col" className="p-4 flex items-center gap-1">
                                        Items 
                                        <i className="uil uil-arrow-down text-xl"></i>
                                    </th>
                                    <th scope="col" className="p-4">
                                        Seller
                                    </th>
                                    <th scope="col" className="p-4">
                                        Type
                                    </th>
                                    <th scope="col" className="p-4">
                                        Price
                                    </th>
                                    <th scope="col" className="p-4">
                                        Action
                                    </th>
                                    <th scope="col" className="p-4 text-center">
                                        Checkout
                                    </th>
                                
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cartItems?.map(item => (
                                        <tr className=" border-b border-b-primary text-primaryLight"
                                        key={item?._id}
                                        >
                                            <td className="p-4 font-medium flex items-center gap-4">
                                                <div className='flex items-center gap-4'>
                                                    <div className='w-[50px] h-[50px]'>
                                                        <img 
                                                        src={`/products/${item?.image}`} 
                                                        alt={item?.title} 
                                                        className='w-full h-full object-cover rounded-full' 
                                                        />
                                                    </div>
                                                    <div className='text-sm'>
                                                        <p className='text-secondary'>{item?.title}</p>
                                                        {/* <span className='text-xs text-primaryLight'>catalogapp.io</span> */}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                {item?.seller?.name}
                                            </td>
                                            <td className="p-4">
                                                {item?.type === 1 ? 'Product' : item?.type === 2 ? 'Service' : item?.type === 3 ? 'Account' : 'not defined'}
                                            </td>
                                            <td className="p-4">
                                                ${item?.price}
                                            </td>
                                            <td 
                                            className="p-4 "
                                            >
                                                <i className="uil uil-trash-alt cursor-pointer" onClick={() => removeFromCartHandler(item?._id)}></i>
                                            </td>
                                            <td className="p-4 ">
                                                <div className='flex justify-center'>
                                                    {
                                                        // !item?.chatExist && item?.type === 2
                                                        !item?.chat
                                                        ?  
                                                        <button 
                                                        className="btn-primary py-2 5 px-6 disabled:cursor-not-allowed"
                                                        disabled={chatLoading}
                                                        onClick={() => chatNowHanlder(item)}
                                                        >
                                                            {chatLoading ? 'Loading...' : 'Chat Now'}
                                                        </button>
                                                        :
                                                        <button 
                                                        className="btn-primary py-2 5 px-6 disabled:cursor-not-allowed"
                                                        disabled={loading}
                                                        onClick={() => buyNowHandler(item)}>
                                                            {
                                                                loading 
                                                                ? 
                                                                <ClipLoader size={20} /> 
                                                                : 'Buy Now'
                                                            }
                                                        </button>
                                                    }
                                                    
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }        
                            </tbody>
                        </table>

                        : 
                        <div className='w-full h-[50vh] flex items-center justify-center text-4xl font-semibold text-gray-400'>
                            No items in your cart.
                        </div>
                    }
            </div>
        </div>
    )
}

export default Table