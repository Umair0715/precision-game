import React from 'react'
import AllPackages from '../../../components/allPackages';
import Sidebar from '../../../components/dashboard/sidebar';
import { useAdminContext } from '../../../context/adminContext';

const Packages = () => {
    const { showAdminDrawer , setShowAdminDrawer , setShowAdminPopup , setAdminActivePopup } = useAdminContext();



    return (
        <div className='w-full min-h-screen h-full flex'>
            <div className={`fixed top-0 md:left-0  duration-300 ease-in-out ${showAdminDrawer ? 'left-0' : '-left-full'} w-[250px] h-screen z-[999]`}>
                <Sidebar />
            </div>
            <div className='w-full bg-bgColor md:ml-[250px] sm:py-6 py-4 sm:px-4 px-2'>
                <div className='text-4xl text-primary flex items-center justify-between'>
                    <h3>All Packages</h3>
                    <div className='md:hidden flex text-4xl text-secondary cursor-pointer'
                    onClick={() => setShowAdminDrawer(true)}>
                        <i className="uil uil-bars"></i>
                    </div>
                </div>
                <div className='mt-12 mb-4'>
                    <button className="btn-primary py-3 px-12"
                    onClick={() => {
                        setAdminActivePopup(3);
                        setShowAdminPopup(true);
                    }}
                    >
                        Create New Package
                    </button>
                </div>
                <div className='w-full rounded-lg p-4 shadow-1 bg-bgColor'>
                    <AllPackages />
                </div>
            </div>
        </div>
    )
}

export default Packages;