

const Header = ({ myChats , setMyChats }) => {

    // const handleSearchChange = (e) => {
    //     dispatch(fetchMyChats(e.target.value , setMyChats));
    // }

    return (
        <div className='w-full flex items-center justify-between border-b border-b-primary p-4'>
            <div>
                <div className='flex items-center gap-2'>
                    <h5 className='text-[17px] font-semibold text-secondary'>Chat</h5>
                    <div className='bg-primary py-1 px-3 rounded-full text-xs text-black'>
                        {myChats?.length} Active
                    </div>
                </div>
                <p className='text-sm text-primaryLight mt-1.5'>Chat with all your buyers</p>
            </div>
            {/* <div className='sm:flex hidden items-center gap-4 border border-primaryLight text-primary py-1.5 px-4 rounded-md'>
                <i className="uil uil-search"></i>
                <DebounceInput
                    debounceTimeout={300}
                    onChange={handleSearchChange} 
                    className=' rounded-md outline-none bg-inherit text-primary placeholder:text-primary'
                    placeholder='Search..'
                />
            </div> */}
        </div>
    )
}

export default Header