import React from 'react'

const Header = () => {
    return (
        <div className='w-full flex items-center justify-between border-b border-b-primary p-4'>
            <div>
                <div className='flex items-center gap-2'>
                    <h5 className='text-[17px] font-semibold text-secondary'>Chat Support Agent</h5>
                </div>
                <p className='text-sm text-primaryLight'>Get live support from our representatives</p>
            </div>
        </div>
    )
}

export default Header