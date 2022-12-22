import { useEffect , useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import Table from './Table';
import Pagination from './Pagination';
import { useSelector } from 'react-redux';

const Transactions = () => {
    const [transactions , setTransactions] = useState([]);
    const [loading , setLoading] = useState(false);
    const [pages , setPages] = useState('');
    const [page , setPage] = useState(''); 

    const { user } = useSelector(state => state.auth);

    const fetchTransactions = async (pageNumber = 1) => {
        try {
            setLoading(true);
            const { data : { data : { transactions : _transactions , currentPage , pages } } } = await axios.get( user?.role === 2 ? `/api/transaction/my?pageNumber=${pageNumber}` : `/api/transaction?pageNumber=${pageNumber}` , { 
                headers : {
                    'content-type' : 'application/json'
                }
            });
            setTransactions(_transactions);
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
        fetchTransactions();
    }, []);

    return (
        <div>
            <div className='py-4 sm:pl-3 pl-2 text-3xl font-semibold text-primary'>
                <h4>Transactions</h4>
            </div>
            {
                loading 
                ? 
                    <div className='w-full h-full flex items-center justify-center py-12'>
                        <ClipLoader size={20} color='#fff' />
                    </div>
                : 
                transactions?.length > 0
                ? 
                    <div>
                        <Table 
                        transactions={transactions}
                        />
                        <Pagination 
                        pages={pages}
                        currentPage={page}
                        fetchTransactions={fetchTransactions}
                        />
                    </div>
                : 
                    <div className='w-full h-full flex items-center justify-center text-gray-400 font-semibold text-3xl'>
                        No transaction found.
                    </div>

            }
        </div>
    )
}

export default Transactions