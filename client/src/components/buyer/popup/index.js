import React from 'react'
import { useBuyerContext } from '../../../context/buyerContext';
import Feedback from './feedback';
import MakePurchase from './purchase';
import Report from './report';

const BuyerPopup = () => {
    const { buyerActivePopup } = useBuyerContext();
    // 1 = 'purchase' , 2 = 'report' , 3='feedback'
    return (
        <div className='w-full h-screen fixed top-0 left-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center'>
            <div className=' bg-bgColor rounded-lg lg:w-1/2 md:w-[60%] sm:w-[70%] w-[90%]'>
                {
                    buyerActivePopup === 1
                    ? 
                        <MakePurchase />
                    :
                    buyerActivePopup === 2
                    ? 
                        <Report />
                    :
                    buyerActivePopup === 3 
                    ? 
                        <Feedback />
                    : 
                        ''
                    
                }
            </div>
        </div>
    )
}

export default BuyerPopup;