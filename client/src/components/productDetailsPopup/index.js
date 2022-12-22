import { useProductContext } from '../../context/productContext';
import Header from './Header'
import Rating from './Rating';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart } from '../../redux/actions/cartActions';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useChatContext } from '../../context/chatContext';
import { createChat } from '../../utils/chats';
import { ClipLoader } from 'react-spinners';


const ProductDetailsPopup = () => {
    const { setSelectedChat } = useChatContext();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { selectedProduct , setShowProductDetailsPopup } = useProductContext();
    const [loading , setLoading] = useState(false);
    const [chatLoading , setChatLoading] = useState(false);
    const { user } = useSelector(state => state.auth)
    const [isAccountPaid , setIsAccountPaid] = useState(false);

    const addToCartHandler = () => {
        dispatch(addToCart(selectedProduct?._id , 1 , toast , navigate , setShowProductDetailsPopup));
    }

    const buyNowHandler = async () => {
        try {
            setLoading(true);
            const { data : { data : { url } } } = await axios.post('/api/stripe/create-checkout-session' , { orderItem : selectedProduct , userId : user?._id}, {
                headers : {
                    'content-type' : 'application/json'
                }
            });
            if(url){
                window.location.href = url;
            }
            localStorage.setItem('currentOrder' , JSON.stringify(selectedProduct));
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const createChatHander = async () => {
        try {
            setChatLoading(true);
            const chat = await createChat(selectedProduct?.seller?._id);
            setSelectedChat(chat);
            navigate('/chat');
            setShowProductDetailsPopup(false);
            setChatLoading(false);
        } catch (err) {
            setChatLoading(false);
            toast.error(err?.response?.data?.message || 'something went wrong.')
        }
    }

    useEffect(() => {
        const checkAccountStatus = async () => {
            try {
                const { data : { data : { isPaid } } } = await axios.post('/api/order/isPaid' , { orderItem : selectedProduct?._id } , {
                    headers : {
                        'content-type' : 'application/json'
                    }
                });
                setIsAccountPaid(isPaid); 
            } catch (error) {
                toast.error('something went wrong.')
            }
        }

        if(selectedProduct?.type === 3){
            checkAccountStatus();
        }
    }, [selectedProduct])

    return (
        <div className='w-full h-screen fixed top-0 left-0 bg-black bg-opacity-50 z-[99] flex items-center justify-center'>
            <div className='md:h-auto h-[400px] chatsScroll overflow-auto bg-bgColor pb-8 lg:w-[60%] md:w-[70%] sm:w-[90%] w-full'>
                <Header />
                <div className='w-full flex sm:flex-row flex-col-reverse py-4 sm:px-4 px-2 gap-8'>
                    <div className='flex-[0.6] flex flex-col gap-4'>
                        <h3 className='text-2xl font-semibold text-primary'>{selectedProduct?.title}</h3>
                        <p className='text-primaryLight font-[100] text-sm'>{selectedProduct?.description}</p>
                        <div className='w-full relative pb-3 pt-6 pr-2'>
                            <img 
                            src={`/products/${selectedProduct?.image}`} 
                            alt={selectedProduct?.title} 
                            className='rounded-tr-[40px] rounded-bl-[40px] z-50 lg:w-[70%] sm:w-[80%] w-full h-full relative ml-4'
                            />
                            <div className='absolute h-[90%] lg:w-[70%] sm:w-[80%] w-full -top-0 -left-4 bg-yellow-300 z-[1] bg-opacity-40 rounded-tr-[40px] rounded-bl-[40px] ml-4'></div>
                        </div>
                        <div className='flex gap-4 items-center uppercase'>
                            {
                                selectedProduct?.type !== 2 && 
                                <button 
                                className="btn-primary py-2 px-8 disabled:cursor-not-allowed"
                                disabled={loading}
                                onClick={buyNowHandler}
                                >
                                    { loading ? <ClipLoader size={20} /> : 'Buy Now' }
                                </button>
                            }
                            <button 
                            className="btn-secondary py-2 px-8 disabled:cursor-not-allowed"
                            disabled={loading}
                            onClick={() => addToCartHandler()}
                            >
                                Add To Cart
                            </button>
                        </div>
                    </div>
                    <div className='flex-[0.4] flex flex-col sm:gap-0 gap-8  justify-between'>
                       <div>
                            <div>
                                <h4 className='text-3xl font-bold text-secondary'>${selectedProduct?.price}</h4>
                                <Rating rating={5} />
                            </div>
                            <div className='mt-6 flex flex-col gap-2'>
                                <h5 className=' font-semibold text-secondary mb-2'>DETAILS</h5>
                                <div className='flex items-center gap-3 text-sm'>
                                    <p className='text-primary font-medium'>Item Type:</p>
                                    <span className='text-primaryLight font-[100]'>{selectedProduct?.type === 1 ? 'Product' : selectedProduct?.type === 2 ? 'Service' : 
                                    selectedProduct?.type === 3 ? 'Account' : 'Type not specified'}</span>
                                </div>
                                {
                                    selectedProduct?.type === 3 && 
                                    <div className='flex flex-col gap-3 text-sm'>
                                        <div className='flex items-center gap-3'>
                                            <h5 className='text-primary font-medium'>Account Title:</h5>
                                            <span className='text-primaryLight font-[100]'>
                                                {selectedProduct?.accountTitle}
                                            </span>
                                        </div>
                                        <div className='flex items-center gap-3'>
                                            <h5 className='text-primary font-medium'>Email:</h5>
                                            <span className='text-primaryLight font-[100]'>
                                                {
                                                isAccountPaid ? selectedProduct?.accountEmail : '*******@gmail.com' 
                                                }
                                            </span>
                                        </div>
                                        <div className='flex items-center gap-3'>
                                            <h5 className='text-primary font-medium'>Password:</h5>
                                            <span className='text-primaryLight font-[100]'>
                                                {
                                                    isAccountPaid 
                                                    ? 
                                                    selectedProduct?.accountPassword
                                                    : 
                                                        '***********'
                                                }
                                            </span>
                                        </div>
                                        
                                    </div>
                                }
                            </div>
                       </div>
                       <div className='w-full flex sm:justify-end mt-8'>
                            <div className='flex sm:flex-col sm:gap-0 gap-8 flex-row'>
                                <div>
                                    <h5 
                                    className='font-semibold text-secondary mb-1 text-[17px]'
                                    >
                                        <span className='text-primary'>
                                            Seller: 
                                        </span>
                                        {selectedProduct?.seller?.name}
                                    </h5>
                                    <button 
                                    className="btn-primary py-2 px-6 text-sm"
                                    onClick={createChatHander}
                                    disabled={chatLoading}
                                    >
                                        {chatLoading ? 'Creating chat...' : 'Message Seller'}
                                    </button>
                                </div>
                                <div className=''>
                                    <p className='text-sm mt-2 text-primary'>Seller Rating</p>
                                    <Rating rating={5} />
                                </div>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailsPopup;


