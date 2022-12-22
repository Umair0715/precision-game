import Table from './Table'
import Header from './Header'
import Pagination from './Pagination';
import { useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { getMyOrders } from '../../../redux/actions/orderActions';


const tabs = [
    {
        id : '1' ,
        name : 'View All' ,
        type : null
    } ,
    {
        id : '2' ,
        name : 'Products' ,
        type : 1 
    } ,
    {
        id : '3' ,
        name : 'Services' ,
        type : 2 
    } ,
    {
        id : '4' ,
        name : 'Accounts' ,
        type : 3 
    } ,
]

const PurchaseTable = () => {
    const dispatch = useDispatch();
    const [activeTab , setActiveTab] = useState('1');
    const { loading , ordersList } = useSelector(state => state.orders);


    const handleTabClick = (tab) => {
        setActiveTab(tab?.id);
        dispatch(getMyOrders('/my' , 1 , tab?.type));
    }


    return (
        <div className=''>
            <Header />
            <div className='sm:p-4 py-4 px-2 border-b border-b-primary flex items-center justify-between '>
                <div className='flex items-center border border-primaryLight rounded-md text-primaryLight '>
                    {
                        tabs?.map(tab => {
                            return <p 
                            className={`${activeTab === tab.id ? 'bg-primary text-black' : ''} py-1.5 cursor-pointer px-4 border-r border-r-primaryLight `} 
                            key={tab?.id}
                            onClick={() => handleTabClick(tab)}
                            >
                                {tab?.name}
                            </p>
                        })
                    }
                </div>
                {/* <div className='md:flex hidden items-center gap-4'>
                    <div className='flex items-center gap-4 border border-primaryLight text-primary py-1.5 px-4 rounded-md'>
                        <i className="uil uil-search"></i>
                        <input 
                        type="text" 
                        className='border-none outline-none bg-inherit text-primary placeholder:text-primary'
                        placeholder='Search..'
                        />
                    </div>
                </div> */}
            </div>
            {
                loading 
                ? 
                    <div className='py-8 text-4xl font-semibold text-gray-400 flex items-center justify-center'>
                        <ClipLoader size={20} color='#fff' />
                    </div>
                : 
                ordersList?.length > 0
                ? 
                    <>
                        <Table />
                        <Pagination />
                    </>
                : 
                    <div className='py-8 text-4xl font-semibold text-gray-400 flex items-center justify-center'>
                        No Order found.
                    </div>
            }
            
        </div>
    )
}

export default PurchaseTable;