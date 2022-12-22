import { useAdminContext } from '../../../context/adminContext';

const Header = ({ heading }) => {
    const { setShowAdminPopup } = useAdminContext()

    return (
        <div className='bg-gradient w-full rounded-br-[10px] rounded-bl-[10px] '>
            <div className='w-full flex items-center justify-between py-4 sm:px-4 px-2 '>
                <h4 className='text-xl font-bold'>{heading}</h4>
                <div 
                title='Close Popup'
                className='underline cursor-pointer'
                onClick={() => setShowAdminPopup(false)}>
                    <span>Close</span>
                </div>
            </div>
        </div>
    )
}

export default Header;