import React from 'react'
import Header from '../Header'

const tabs = [
    {
        id : 1 ,
        name : 'All'
    },
    {
        id : 2 ,
        name : 'Products'
    },
    {
        id : 3 ,
        name : 'Services'
    },
    {
        id : 4 ,
        name : 'Accounts'
    }
]

const Report = () => {
    return (
        <div>
            <Header heading='Report Seller' />
            <div className='py-8 px-8 chatsScroll h-[400px] overflow-auto'>
                <form className='flex flex-col gap-6'>
                    <div className='flex flex-col gap-2 flex-[0.6]'>
                        <label htmlFor="title" className='text-primary font-semibold'>
                            Title
                        </label>
                        <input 
                        id='title'
                        type="text"
                        placeholder='Enter title of your dispute'
                        className='border border-primary outline-none rounded-lg py-2 px-3 bg-gray-300 '
                        />
                    </div>
                    <div className=''>
                    <div className='flex flex-col gap-2 text-primary'>
                        <h5>Service Category</h5>
                        <div className='border border-primaryLight rounded-md flex items-center w-fit'>
                            {
                                tabs?.map((tab,i) => (
                                    <div 
                                    key={tab?.id}
                                    className={`py-2 px-4 border-r border-r-primaryLight cursor-pointer
                                   }
                                    `}
                                    >
                                        {tab?.name}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                    <div className='flex flex-col gap-2'>
                            <label htmlFor="description" className='text-primary font-semibold'>
                                Additional Comments
                            </label>
                            <textarea 
                            id='description'
                            type="text"
                            placeholder='Tell us more about thedispute with the seller.'
                            className='border border-primary outline-none rounded-lg py-2 px-3 bg-gray-300 resize-none h-[110px]'
                            />
                    </div>
                    <div className='flex flex-col gap-2 text-primary'>
                        <label htmlFor="image" className='text-primary font-semibold'>Add Image</label>
                        <div  className='w-[100px] h-[100px] border border-dashed border-secondary rounded-tr-[20px] rounded-bl-[20px] flex items-center justify-center text-secondary text-xl cursor-pointer'>
                            <i className="uil uil-plus"></i>
                        </div>
                    </div>
                    <div>
                        <button className="btn-primary py-3 px-12 uppercase">Report</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Report