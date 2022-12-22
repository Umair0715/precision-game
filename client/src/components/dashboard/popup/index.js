import React from 'react'
import { useAdminContext } from '../../../context/adminContext'
import AddPackage from './AddPackage';
import ChangePassword from './ChangePassword';
import ChangeProfit from './ChangeProfit';
import CreateGame from './CreateGame';

const AdminPopup = () => {
    const { adminActivePopup } = useAdminContext();

    return (
        <div className='w-full h-screen fixed top-0 left-0 bg-black bg-opacity-50 z-[99] flex items-center justify-center'>
            <div className=' bg-bgColor pb-8 lg:w-1/2 md:w-[60%] sm:w-[70%] w-full'>
                {
                    adminActivePopup === 1 
                    ? 
                        <ChangeProfit />
                    :
                    adminActivePopup === 2 
                    ? 
                        <ChangePassword />
                    : 
                    adminActivePopup === 3 
                    ? 
                        <AddPackage />
                    : 
                    adminActivePopup === 4 
                    ? 
                        <CreateGame />
                    :
                        ''
                }
            </div>    
        </div>
    )
}

export default AdminPopup