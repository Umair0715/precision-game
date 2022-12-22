import { useSelector } from 'react-redux';
import moment from 'moment';


const Table = () => {
    const { ordersList } = useSelector(state => state.orders);


    return (
        <div className='overflow-x-auto'>
            <table className="overflow-auto w-full text-sm text-left text-secondary ">
                <thead className="overflow-auto text-sm text-secondary border-b border-b-primary ">
                    <tr className=''>
                        <th scope="col" className="p-4 flex items-center gap-1">
                            Items 
                            <i className="uil uil-arrow-down text-xl"></i>
                        </th>
                        <th scope="col" className="p-4">
                            Order Number
                        </th>
                        <th scope="col" className="p-4">
                            Purchase Date
                        </th>
                        <th scope="col" className="p-4">
                            Sales Price
                        </th>
                        <th scope="col" className="p-4">
                            Purchase Status
                        </th>
                       
                    </tr>
                </thead>
                <tbody className='overflow-auto'>
                    {
                        ordersList?.map(order => (
                            <tr className=" border-b border-b-primary text-primaryLight"
                            key={order?._id}
                            >
                                <td className="p-4 font-medium flex items-center gap-4">
                                    {/* <div className="hidden md:flex items-center">
                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-secondary bg-none rounded border-secondary focus:ring-secondary focus:ring-2 " />
                                        <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                    </div> */}
                                    <div className='flex items-center gap-4'>
                                        <div className='w-[50px] h-[50px]'>
                                            <img 
                                            src={`/products/${order?.orderItem?.image}`} 
                                            alt={order?.orderItem?.title} 
                                            className='w-full h-full object-cover rounded-full' 
                                            />
                                        </div>
                                        <div className='text-sm'>
                                            <p className='text-secondary'>{order?.orderItem?.title}</p>
                                            {/* <span className='text-xs text-primaryLight'>catalogapp.io</span> */}
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    {order?._id}
                                </td>
                                <td className="p-4">
                                    {moment(order?.createdAt).format('DD MMMM YYYY')}
                                </td>
                                <td className="p-4">
                                    {order?.orderItem?.price}
                                </td>
                                <td className=''>
                                    <div className=' text-center  flex items-center justify-center '>
                                        <p className={`${order?.isPaid ? 'bg-green-100 text-green-500 ' : 'bg-red-100 text-red-500'} py-[2px] px-3 rounded-full text-xs`}>{order?.isPaid ? 'Paid' : 'Not Paid'}</p>
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

export default Table

