import Sidebar from "../../../components/dashboard/sidebar";
import { useAdminContext } from "../../../context/adminContext";
import Pagination from "./Pagination";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { checkAdmin } from "../../../utils/redirectTo";
import axios from "axios";
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import moment from 'moment';
import { deleteUser } from "../../../utils/adminFunctions";

// const avatar = 'https://gitlab.com/uploads/-/system/user/avatar/56386/tt_avatar_small.jpg';


const Sellers = () => {
    const { setShowAdminDrawer , showAdminDrawer } = useAdminContext();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth)
    const [loading , setLoading] = useState(false);
    const [allSellers, setAllSellers] = useState([]);
    const [pages , setPages] = useState(0);
    const [currentPage , setCurrentPage] = useState(1);
    
    useEffect(() => {
        checkAdmin(navigate , user);
    }, [user , navigate]);

    const fetchSellers = async ( page = 1 ) => {
        try {
            setLoading(true);
            const { data : { data : { sellers , pages : _pages , currentPage : _currentPage } } } = await axios.get(`/api/admin/sellers?pageNumber=${page}`);
            setAllSellers(sellers);
            setPages(_pages);
            setCurrentPage(_currentPage);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error(error?.response?.data?.message || 'something went wrong.')
        }
    }

    useEffect(() => {
        fetchSellers();
    }, []);

    const deleteUserHandler = async (userId) => {
        if(window.confirm('Are you sure you want to delete this user?')){
            try {
                const message = await deleteUser(userId);
                setAllSellers(allSellers?.filter(s => s._id !== userId));
                toast.success(message);
            } catch (error) {
                toast.error(error?.response?.data?.message || 'something went wrong.')
            }
        }
        return;
    }

    return (
        <div className='w-full min-h-screen h-full flex'>
            <div className={`fixed top-0 md:left-0  duration-300 ease-in-out ${showAdminDrawer ? 'left-0' : '-left-full'} w-[250px] h-screen z-[999]`}>
                <Sidebar />
            </div>
            <div className='w-full bg-bgColor md:ml-[250px] py-6 sm:px-4'>
                <div className='text-4xl text-primary flex items-center justify-between sm:px-0 px-2'>
                    <h3>Sellers</h3>
                    <div className='md:hidden flex text-4xl text-secondary cursor-pointer'
                    onClick={() => setShowAdminDrawer(true)}>
                        <i className="uil uil-bars"></i>
                    </div>
                </div>
                <div className='bg-bgColor shadow-1 mt-6 overflow-x-auto'>
                    {
                        loading 
                        ? 
                            <div className='w-full h-full flex items-center justify-center py-12'>
                                <ClipLoader size={25} color='#fff' />
                            </div>
                        : 
                            <>
                                <table className="w-full text-sm text-left text-secondary ">
                                    <thead className="text-sm text-secondary border-b border-b-primary ">
                                        <tr className=''>
                                            <th scope="col" className="p-4 flex items-center gap-1">
                                                Name 
                                                <i className="uil uil-arrow-down text-xl"></i>
                                            </th>
                                            <th scope="col" className="p-4">
                                                Email
                                            </th>
                                            <th scope="col" className="p-4">
                                                Joined
                                            </th>
                                            <th scope="col" className="p-4">
                                                
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            allSellers?.map(seller => (
                                                <tr className=" border-b border-b-primary  " key={seller?._id}>
                                                    <td 
                                                    className="p-4 font-medium text-secondary flex items-center gap-4">
                                                        <div className='flex items-center gap-4'>
                                                            {/* <div className='w-[50px] h-[50px]'>
                                                                <img 
                                                                src={avatar} 
                                                                alt="avatar" 
                                                                className='w-full h-full object-cover rounded-full' 
                                                                />
                                                            </div> */}
                                                            <div className='text-sm'>
                                                                <p>{seller?.name}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 md:w-[30%]">
                                                        <div className=''>
                                                            <p>{seller?.email}</p>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        {moment(seller?.createdAt).format('DD MMM Do YYYY')}
                                                    </td>
                                                    <td className="p-4 ">
                                                        <div className='flex items-center gap-6 text-secondary text-xl'>
                                                            <div className='cursor-pointer'
                                                            onClick={() => deleteUserHandler(seller?._id )}
                                                            >
                                                                <i className="uil uil-trash-alt"></i>
                                                            </div>
                                                            {/* <div className='cursor-pointer'>
                                                                <i className="uil uil-pen"></i>
                                                            </div> */}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        
                                    </tbody>
                                </table>
                                <Pagination 
                                pages={pages}
                                currentPage={currentPage}
                                fetchSellers={fetchSellers}
                                />
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Sellers;