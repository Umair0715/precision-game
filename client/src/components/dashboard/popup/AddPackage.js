import axios from 'axios';
import React, { useState } from 'react'
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useAdminContext } from '../../../context/adminContext';
import Header from './Header';

const AddPackage = () => {
    const { packages , setPackages , setShowAdminPopup } = useAdminContext();
    const [name , setName] = useState('');
    const [price , setPrice] = useState('');
    const [duration , setDuration] = useState(2);
    const [shortDescription , setShortDescription] = useState('');
    const [feature1, setFeature1] = useState([]);
    const [feature2 , setFeature2] = useState([]);
    const [feature3 , setFeature3] = useState([]);
    const [loading , setLoading] = useState(false);
    const [packageDiscount , setPackageDiscount] = useState('');


    const submitHandler = async (e) => {
        e.preventDefault();
        const packageData = {
            name , price , duration , packageDiscount , shortDescription ,
            features : [feature1 , feature2 , feature3]
        }

        try {
            setLoading(true);
            const { data : { data : { package : _package } } } = await axios.post('/api/admin/package' , packageData , {
                headers : {
                    'content-type' : 'application/json'
                }
            });
            setPackages([ _package , ...packages]);
            setShowAdminPopup(false);
            setName('');
            setPrice('');
            setDuration('');
            setPackageDiscount('');
            setShortDescription('');
            setFeature1('');
            setFeature2('');
            setFeature3('');
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error(error?.response?.data?.message || 'something went wrong.')
        }

    }

    

    return (
        <div>
            <div>
                <Header heading='Create Package'/>
            </div>
            <div className='mt-6 chatsScroll h-full max-h-[350px] sm:px-4 px-2 overflow-auto'>
                <form className='flex flex-col gap-6' onSubmit={submitHandler}>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name" className='text-primary font-semibold'>
                            Package Name
                        </label>
                        <input 
                        id='name'
                        type="text"
                        placeholder='Enter package name'
                        className='border border-primary outline-none rounded-lg py-2 px-3 bg-gray-300'
                        onChange={e => setName(e.target.value)}
                        value={name}
                        required
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="price" className='text-primary font-semibold'>
                            Price
                        </label>
                        <input 
                        id='price'
                        type="number"
                        placeholder='Package price'
                        className='border border-primary outline-none rounded-lg py-2 px-3 bg-gray-300'
                        onChange={e => setPrice(e.target.value)}
                        value={price}
                        required
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="packageDiscount" className='text-primary font-semibold'>
                            Discount Percentage
                        </label>
                        <input 
                        id='packageDiscount'
                        type="number"
                        placeholder='Package Discount '
                        className='border border-primary outline-none rounded-lg py-2 px-3 bg-gray-300'
                        onChange={e => setPackageDiscount(e.target.value)}
                        value={packageDiscount}
                        required
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="duration" className='text-primary font-semibold'>
                            Duration
                        </label>
                        <select 
                        id='duration'
                        type="text"
                        placeholder='Package duration'
                        className='border border-primary outline-none rounded-lg py-2 px-3 bg-gray-300'
                        onChange={e => setDuration(e.target.value)}
                        value={duration}
                        required
                        >
                            {/* 1=week , 2=month , 3=6month , 4=year */}
                            <option value={1}>Week</option>
                            <option value={2}>Month</option>
                            <option value={3}>6 Month</option>
                            <option value={4}>Year</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="shortDescription" className='text-primary font-semibold'>
                            Short Description <span className='text-sm'>(5-8 words only)</span>
                        </label>
                        <input 
                        id='shortDescription'
                        type="text"
                        placeholder='5-8 word short description'
                        className='border border-primary outline-none rounded-lg py-2 px-3 bg-gray-300'
                        onChange={e => setShortDescription(e.target.value)}
                        value={shortDescription}
                        required
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="features" className='text-primary font-semibold'>
                            Features
                        </label>
                        <input 
                        id='features'
                        type="text"
                        placeholder='Feature 1'
                        className='border border-primary outline-none rounded-lg py-2 px-3 bg-gray-300'
                        onChange={e => setFeature1(e.target.value)}
                        required
                        />
                        <input 
                        type="text"
                        placeholder='Feature 2'
                        className='border border-primary outline-none rounded-lg py-2 px-3 bg-gray-300'
                        onChange={e => setFeature2(e.target.value)}
                        required
                        />
                        <input 
                        id='features'
                        type="text"
                        placeholder='Feature 3'
                        className='border border-primary outline-none rounded-lg py-2 px-3 bg-gray-300'
                        onChange={e => setFeature3(e.target.value)}
                        required
                        />
                    </div>
                    <div>
                        <button 
                        className="btn-primary py-3 px-12 uppercase"
                        type='submit'
                        disabled={loading}
                        >
                            {loading ? <ClipLoader size={20} /> : 'Create Package'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddPackage