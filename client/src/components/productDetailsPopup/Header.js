import { useProductContext } from "../../context/productContext";


const Header = () => {
    const { setShowProductDetailsPopup } = useProductContext()

    return (
        <div className='bg-gradient w-full rounded-br-[10px] rounded-bl-[10px] '>
            <div className='w-full flex items-center justify-between py-4 px-6 '>
                <h4 className='text-xl font-bold'>About Service</h4>
                <div 
                title='Close Popup'
                className='underline cursor-pointer'
                onClick={() => setShowProductDetailsPopup(false)}>
                    <span>Close</span>
                </div>
            </div>
        </div>
    )
}

export default Header;