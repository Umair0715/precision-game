import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useSellerContext } from '../../../context/sellerContext';
import { useProductContext } from '../../../context/productContext';
import { createProduct } from '../../../redux/actions/productActions';
import { ClipLoader } from 'react-spinners';


const Product = ({ selectedGame , setSelectedGame }) => {
    const imageRef = useRef();
    const { setShowAddItemPopup } = useSellerContext();
    const { setProducts } = useProductContext();

    const [title , setTitle] = useState('');
    const [price , setPrice] = useState('');
    const [description , setDescription] = useState('');
    const [image , setImage] = useState('');
    const [loading , setLoading] = useState(false);

    const handleChange = async (e) => {
        let file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (readerEvent) => { 
            setImage(readerEvent.target.result);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            title , price , description , image , type : 1 , game : selectedGame
        }
        createProduct(data , setLoading , toast , setProducts , setShowAddItemPopup , setImage);
    }


    return (
        <div className='mt-6  overflow-auto'>
            <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
                <div className='flex sm:flex-row flex-col items-center justify-between sm:gap-4 gap-6'>
                    <div className='flex flex-col gap-2 sm:flex-[0.6] flex-1 w-full'>
                        <label htmlFor="title" className='text-primary font-semibold'>
                            Title
                        </label>
                        <input 
                        id='title'
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                        placeholder='Enter title of your listing Product'
                        className='border border-primary outline-none rounded-lg py-2 px-3 bg-gray-300 '
                        />
                    </div>
                    <div className='flex flex-col gap-2 sm:flex-[0.4] flex-1 w-full'>
                        <label htmlFor="price" className='text-primary font-semibold'>
                            Price
                        </label>
                        <input 
                        id='price'
                        type="text"
                        placeholder='$'
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        required
                        className='border border-primary outline-none rounded-lg py-2 px-3 bg-gray-300 '
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                        <label htmlFor="description" className='text-primary font-semibold'>
                            Description
                        </label>
                        <textarea 
                        id='description'
                        type="text"
                        placeholder='Write a brief description about product  you want to list'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                        className='border border-primary outline-none rounded-lg py-2 px-3 bg-gray-300 resize-none h-[110px]'
                        />
                </div>
                <div className='flex flex-col gap-2 text-primary'>
                    <input 
                    type="file" 
                    hidden 
                    ref={imageRef}
                    onChange={handleChange}
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
                        {loading ? <ClipLoader size={20} /> : 'Add Item'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Product