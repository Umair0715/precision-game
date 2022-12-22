import { useSellerContext } from '../../../context/sellerContext';

const Header = () => {
    const { setShowAddItemPopup } = useSellerContext()

    return (
        <div className='bg-gradient w-full rounded-br-[10px] rounded-bl-[10px] '>
            <div className='w-full flex items-center justify-between py-4 px-6 '>
                <h4 className='text-xl font-bold'>Add New Item</h4>
                <div 
                title='Close Popup'
                className='underline cursor-pointer'
                onClick={() => setShowAddItemPopup(false)}>
                    <span>Close</span>
                </div>
            </div>
        </div>
    )
}

export default Header;