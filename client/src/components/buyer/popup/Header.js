import { useBuyerContext } from "../../../context/buyerContext";



const Header = ({ heading }) => {
    const { setShowBuyerPopup } = useBuyerContext()

    return (
        <div className='bg-gradient w-full rounded-br-[10px] rounded-bl-[10px] '>
            <div className='w-full flex items-center justify-between py-4 px-6 '>
                <h4 className='text-xl font-bold'>{heading}</h4>
                <div 
                title='Close Popup'
                className='underline cursor-pointer'
                onClick={() => setShowBuyerPopup(false)}>
                    <span>Close</span>
                </div>
            </div>
        </div>
    )
}

export default Header;