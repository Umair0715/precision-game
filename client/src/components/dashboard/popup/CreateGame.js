import axios from 'axios';
import { useRef, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useAdminContext } from '../../../context/adminContext';
import Header from './Header';

const CreateGame = () => {
    const imageRef = useRef();
    const [name , setName] = useState('');
    const [description , setDescription] = useState('');
    const [image , setImage] = useState('');
    const [loading , setLoading] = useState(false);
    const { setGames , setShowAdminPopup } = useAdminContext();


    const handleImageChange = (e) => {
        let file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (readerEvent) => { 
            setImage(readerEvent.target.result);
        }
    }

    
    const submitHandler = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const { data : { data : { message , game } } } = await axios.post('/api/game' , { 
                name , description , image 
            } , {
                headers : {
                    'content-type' : 'application/json'
                }
            });
            
            setLoading(false);
            setGames(prev => [game , ...prev])
            setShowAdminPopup(false);
            setName('');
            setImage('');
            setDescription('');
            toast.success(message);
        } catch (error) {
            setLoading(false);
            toast.error(error?.response?.data?.message || 'something went wrong.')
        }
    }

    return (
        <div>           
            <div>
                <Header heading='Create New Game' />
            </div>
            <div className='mt-6 chatsScroll h-full max-h-[350px] sm:px-4 px-2 overflow-auto'>
                <form className='flex flex-col gap-6' onSubmit={submitHandler}>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name" className='text-primary font-semibold'>
                            Game Name
                        </label>
                        <input 
                        id='name'
                        type="text"
                        placeholder='Enter game name'
                        className='border border-primary outline-none rounded-lg py-2 px-3 bg-gray-300'
                        onChange={e => setName(e.target.value)}
                        value={name}
                        required
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="description" className='text-primary font-semibold'>
                            Game Description
                        </label>
                        <textarea 
                        id='description'
                        type="text"
                        maxLength={300}
                        placeholder='Enter game description'
                        className='border border-primary outline-none rounded-lg py-2 px-3 bg-gray-300 resize-none h-[100px]'
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                        required
                        />
                    </div>
                    <div className='flex flex-col gap-2 text-primary'>
                        <input 
                        type="file" 
                        hidden 
                        ref={imageRef}
                        onChange={handleImageChange}
                        required
                        />
                        <label htmlFor="image" className='text-primary font-semibold'>Add Image</label>
                        {
                            image 
                            ? 
                                <div className='flex items-center gap-4'>
                                    <img src={image} alt="Preview" className='w-[100px] h-[100px] object-cover rounded-tr-[20px] rounded-bl-[20px]' />
                                    <p 
                                    className='btn-secondary py-2 px-4'
                                    onClick={() => imageRef.current.click()}
                                    >
                                        Change Image
                                    </p>
                                </div>
                            : 
                            <div  
                            className='w-[100px] h-[100px] border border-dashed border-secondary rounded-tr-[20px] rounded-bl-[20px] flex items-center justify-center text-secondary text-xl cursor-pointer'
                            onClick={() => imageRef.current.click()}
                            >
                                <i className="uil uil-plus"></i>
                            </div>
                        }
                    </div>
                    <div>
                        <button
                        type='submit' 
                        className="btn-primary py-3 px-12 uppercase"
                        disabled={loading}
                        >
                            {loading ? <ClipLoader size={20} /> : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateGame