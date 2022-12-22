import React from 'react'
import { usePaymentContext } from '../../context/paymentContext'
import Header from './Header'
import moment from 'moment';

const PaymentProofPopup = () => {
    const { currentPayment } = usePaymentContext();

    return (
        <div className='w-full h-screen fixed top-0 left-0 bg-black bg-opacity-50 z-[999] flex items-center justify-center'>
            <div className=' bg-bgColor pb-8 lg:w-1/2 md:w-[60%] sm:w-[70%] w-full'>
                <Header />

                <div className='flex flex-col gap-4 py-4 sm:px-4 px-2 h-[400px] overflow-auto chatsScroll'>
                    <div>
                        <h5 className='text-lg text-primary font-medium mb-1'>
                            {currentPayment?.status === 2 ? 'Paid Time' : 'Declined at'}
                        </h5>
                        <p className='text-secondary text-sm '>{moment(currentPayment.updatedAt).format('MMMM DD YYYY hh:mm a')}</p>
                    </div>
                    <div>
                        <h5 className='text-lg text-primary font-medium mb-1'>Attachement</h5>
                        <img 
                        className='w-full object-cover rounded-md' 
                        src={`/paymentProofs/${currentPayment?.attachement}`} alt="Attachement" 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentProofPopup