import React from 'react'
import Header from '../Header';
import ReactStars from "react-rating-stars-component";

const Feedback = () => {
    const ratingChanged = () => {

    }

    return (
        <div>
            <Header heading="Review & Feedback Seller" />
            <div className='py-8 px-10 flex flex-col '>
                <div>   
                    <h5 className='text-primary font-medium'>Add Rating</h5>
                    <div>
                        <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={40}
                            activeColor="var(--secondary)"
                        />
                    </div>
                </div>
                <div className='flex mt-2 flex-col gap-2 flex-[0.6]'>
                    <label htmlFor="title" className='text-primary font-semibold'>
                        Comment
                    </label>
                    <input 
                    id='title'
                    type="text"
                    placeholder='Comment'
                    className='border border-primary outline-none rounded-lg py-2 px-3 bg-gray-300 '
                    />
                </div>
                <div className='mt-8'>
                    <button className="btn-primary py-3 px-12 uppercase">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Feedback