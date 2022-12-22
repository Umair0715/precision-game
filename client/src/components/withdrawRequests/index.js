import { useEffect , useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import Table from './Table';
import Pagination from './Pagination';
import { useSelector } from 'react-redux';
import UpdatePaymentPopup from '../updatePaymentPopup';
import { usePaymentContext } from '../../context/paymentContext';
import PaymentProofPopup from '../paymentProofPopup';

const WithdrawRequests = () => {
    const [requests , setRequests] = useState([]);
    const [ loading , setLoading ] = useState(false);
    const { user } = useSelector(state => state.auth)
    const [pages , setPages] = useState('');
    const [page , setPage] = useState(''); 

    const { showUpdatePaymentPopup , showPaymentProofPopup } = usePaymentContext();

    const fetchWithdrawRequests = async (pageNumber = 1) => {
        try {
            setLoading(true);
            const { data : { data : { requests : _requests , currentPage , pages } } } = await axios.get( user?.role === 2 ? `/api/withdraw/my?pageNumber=${pageNumber}` : `/api/withdraw?pageNumber=${pageNumber}` , { 
                headers : {
                    'content-type' : 'application/json'
                }
            });
            setRequests(_requests);
            setPage(currentPage);
            setPages(pages);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log('fetch transaction error' , error)
            toast.error(error?.response?.data?.message || 'something went wrong.')
        }
    };

    useEffect(() => {
        fetchWithdrawRequests();
    }, []);

    return (
        <div>
            <div className='py-4 sm:pl-3 pl-2 text-3xl font-semibold text-primary'>
                <h4>Withdraw Requests</h4>
            </div>
            {
                loading 
                ? 
                    <div className='w-full h-full flex items-center justify-center py-12'>
                        <ClipLoader size={20} color='#fff' />
                    </div>
                : 
                requests?.length > 0
                ? 
                    <div>
                        <Table 
                        requests={requests}
                        />
                        <Pagination 
                        pages={pages}
                        currentPage={page}
                        fetchWithdrawRequests={fetchWithdrawRequests}
                        />
                    </div>
                : 
                    <div className='w-full h-full flex items-center justify-center text-gray-400 font-semibold text-3xl'>
                        No withdraw request found.
                    </div>

            }
            {
                showUpdatePaymentPopup && <UpdatePaymentPopup />
            }
            {
                showPaymentProofPopup && <PaymentProofPopup />
            }
        </div>
    )
}

export default WithdrawRequests;