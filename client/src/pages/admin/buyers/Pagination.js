

const Pagination = ({ pages , currentPage , fetchBuyers }) => {

    return (
        <div className='flex items-center justify-between p-4'>
            <div className={`${currentPage > 1 ? 'cursor-pointer' : 'cursor-not-allowed pointer-events-none'} flex items-center gap-2 text-primary flex-[0.25]`}
            onClick={() => fetchBuyers(currentPage - 1)}>
                <i className="uil uil-arrow-left text-xl"></i>
                <div className='sm:flex hidden'>
                    <button className="btn-secondary py-2 px-8">PREVIOUS</button>
                </div>
            </div>
            <div className='flex-[0.5]'>
                <ul className='flex items-center justify-center gap-4 text-gray-100'>
                    {
                        [...Array(pages).keys()].map((page , i) => (
                            <li 
                            key={i}
                            className={`${page+1 === currentPage ? 'py-2 px-4 bg-primary flex items-center justify-center text-black rounded-md cursor-pointer' : 'cursor-pointer'}`}
                            onClick={() => fetchBuyers(page + 1)}
                            >
                                {page + 1}
                            </li>
                        ))
                    }
                    
                </ul>
            </div>
            {
                pages && 
                <div className={`${currentPage !== pages ? 'cursor-pointer' : 'cursor-not-allowed pointer-events-none'} flex items-center gap-2 text-primary flex-[0.25]`}
                onClick={() => fetchBuyers(currentPage + 1)}>
                    <div className='sm:flex hidden'>
                        <button className="btn-secondary py-2 px-12">NEXT</button>
                    </div>
                    <i className="uil uil-arrow-right text-xl"></i>
                </div>
            }
        </div>
    )
}

export default Pagination