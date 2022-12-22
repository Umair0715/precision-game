import moment from 'moment';
import { useSelector } from 'react-redux';
import { usePaymentContext } from '../../context/paymentContext';

const Table = ({ requests }) => {
    const { user } = useSelector(state => state.auth);
    const { setShowUpdatePaymentPopup , setCurrentPayment , setShowPaymentProofPopup } = usePaymentContext();

    const handleUpdatePaymentClick = (req) => {
        setCurrentPayment(req);
        setShowUpdatePaymentPopup(true);
    }

    const handlePaymentProofClick = (req) => {
        setCurrentPayment(req);
        setShowPaymentProofPopup(true);
    }

    return (
        <div className='overflow-auto'>
            <table className="w-full text-sm text-left text-secondary ">
                <thead className="text-sm text-secondary border-b border-b-primary ">
                    <tr className=''>
                        <th scope="col" className="p-4 flex items-center gap-1">
                            Seller 
                            <i className="uil uil-arrow-down text-xl"></i>
                        </th>
                        <th scope="col" className="p-4">
                            Payment Method
                        </th>
                        <th scope="col" className="p-4">
                            Account
                        </th>
                        <th scope="col" className="p-4">
                            Amount
                        </th>
                        <th scope="col" className="p-4">
                            Created
                        </th>
                        <th scope="col" className="p-4">
                            Status
                        </th>
                    </tr>
                </thead>
                
                <tbody >
                    {
                        requests?.map(req => (
                            <tr className=" border-b border-b-primary  " key={req?._id}>
                                <td className="p-4 ">
                                    <div className='flex  flex-col'>
                                    <h5 className='font-medium'>{req?.user?.name}</h5>
                                    <p>{req?.user?.email}</p>
                                    </div>
                                </td>
                                <td className="p-4 ">
                                    {req?.paymentMethod === 1 ? 'Bank' : req?.paymentMethod === 2 ? 'Stripe' : req?.paymentMethod === 3 ? 'Paypal' : 'not defined'}
                                </td>
                                <td className="p-4">
                                    {
                                        req?.paymentMethod === 1 
                                        ?
                                            <>
                                                <p>{req?.bankIBAN}</p>
                                                <p>{req?.bankAccountName}</p>
                                            </>
                                        : 
                                        req?.paymentMethod === 2 
                                        ? 
                                            <p>{req?.stripeEmail}</p>
                                        : 
                                            <p>{req?.paypalEmail}</p>
                                    }
                                </td>
                                <td className="p-4">
                                    ${req?.amount?.toFixed(2)}
                                </td>
                                <td className="p-4">
                                    {moment(req?.createdAt).format('MMMM DD YYYY')}
                                </td>
                                <td className="p-4 ">
                                    <div className='flex items-center gap-2 text-secondary'>
                                        {
                                        req?.status === 1 
                                        ? 
                                            <> 
                                                <div className='py-1 px-3 bg-yellow-100 text-yellow-600 rounded-full text-xs'>
                                                    Pending
                                                </div>
                                                
                                                {
                                                    user?.role === 3 && 
                                                    <div className='bg-gradient py-1 text-black text-xs cursor-pointer uppercase font-medium px-3 rounded-full '
                                                    onClick={() => handleUpdatePaymentClick(req)
                                                    }>
                                                        update
                                                    </div>
                                                }
                                                
                                            </>
                                        : 
                                        req?.status === 2 || req?.status === 3
                                        ? 
                                            <div className='flex items-center gap-2'>
                                                <div className={`
                                                py-1 px-3  rounded-full text-xs
                                                ${req?.status === 2 
                                                ? 
                                                'bg-green-100 text-green-500' 
                                                : 
                                                'bg-red-100 text-red-500'
                                                }
                                                `}>
                                                    {req?.status === 2 ? 'Paid' : 'Declined'}
                                                </div>
                                                <div className='border border-primary hover:border-secondary py-1 text-secondary text-xs cursor-pointer uppercase font-medium px-3 rounded-full '
                                                onClick={() => handlePaymentProofClick(req)
                                                }>
                                                    Proof
                                                </div>
                                            </div> 
                                        : 'not defined'
                                        }
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table;


