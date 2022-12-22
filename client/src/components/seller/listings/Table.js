import moment from 'moment';
import { useProductContext } from '../../../context/productContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Table = ({ products }) => {
    const { setProducts } = useProductContext();
    
    const deleteProduct = async (product) => {
        setProducts(prev => prev.filter(p => p._id !== product._id ))
        try {
            const { data : { data : { message } } } = await axios.delete(`/api/product/${product?._id}`, { 
                headers : {
                    'content-type' : 'application/json'
                }
            });
            toast.success(message);
        } catch (err) {
            toast.error(err?.response?.data?.message || err?.message || 'something went wrong.')
        }
    }

    return (
        <div>
            <table className="w-full text-sm text-left text-secondary ">
                <thead className="text-sm text-secondary border-b border-b-primary ">
                    <tr className=''>
                        <th scope="col" className="p-4 flex items-center gap-1">
                            Items 
                            <i className="uil uil-arrow-down text-xl"></i>
                        </th>
                        <th scope="col" className="p-4">
                            Rating
                        </th>
                        <th scope="col" className="p-4">
                            Last modified
                        </th>
                        <th scope="col" className="p-4">
                            Sales Price
                        </th>
                        <th scope="col" className="p-4">
                            
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products?.map(product => (
                            <tr className=" border-b border-b-primary"
                            key={product?._id}>
                                <td className="p-4 font-medium text-secondary flex items-center gap-4">
                                    {/* <div className="hidden md:flex items-center">
                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-secondary bg-none rounded border-secondary focus:ring-secondary focus:ring-2 " />
                                        <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                    </div> */}
                                    <div className='flex items-center gap-4'>
                                        <div className='w-[50px] h-[50px]'>
                                            <img 
                                            src={`/products/${product?.image}`} 
                                            alt="avatar" 
                                            className='w-full h-full object-cover rounded-full' 
                                            />
                                        </div>
                                        <div className='text-sm'>
                                            <p>{product?.title}</p>
                                            {/* <span className='text-xs text-primaryLight'>catalogapp.io</span> */}
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 md:w-[30%]">
                                    <div className='flex items-center gap-4'>
                                        <div className='hidden md:flex flex-[0.8] items-center gap-3'>
                                            <div className='w-full bg-gray-400 h-[10px] rounded-full'>
                                                <p className='w-[60%] h-full rounded-full bg-secondary'></p>
                                            </div>
                                            <p className='text-primary'>50</p>
                                        </div>
                                        <div className='flex-[0.2] bg-green-100 rounded-full py-[1px] px-1 text-green-500 flex items-center gap-1'>
                                            <i className="uil uil-arrow-up"></i>
                                            <span>5%</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    {moment(product?.createdAt).format('MMMM DD YYYY')}
                                </td>
                                <td className="p-4">
                                    ${product?.price}
                                </td>
                                <td className="p-4 ">
                                    <div className='flex items-center gap-6 text-secondary text-xl'>
                                        <div className='cursor-pointer' 
                                        onClick={() => deleteProduct(product)}
                                        >
                                            <i className="uil uil-trash-alt"></i>
                                        </div>
                                        <div className='cursor-pointer'>
                                            <i className="uil uil-pen"></i>
                                        </div>
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


