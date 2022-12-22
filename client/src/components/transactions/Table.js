import moment from 'moment';

const Table = ({ transactions }) => {
    
    return (
        <div classname='overflow-auto'>
            <table className="w-full text-sm text-left text-secondary ">
                <thead className="text-sm text-secondary border-b border-b-primary ">
                    <tr className=''>
                        <th scope="col" className="p-4 flex items-center gap-1">
                            Item 
                            <i className="uil uil-arrow-down text-xl"></i>
                        </th>
                        <th scope="col" className="p-4">
                            Done by
                        </th>
                        <th scope="col" className="p-4">
                            Amount
                        </th>
                        <th scope="col" className="p-4">
                            Date
                        </th>
                        <th scope="col" className="p-4">
                            Description
                        </th>
                    </tr>
                </thead>
                
                <tbody >
                    {
                        transactions?.map(tn => (
                            <tr className=" border-b border-b-primary  " key={tn?._id}>
                                <td className="p-4 font-medium text-secondary flex items-center gap-4">
                                    <div className='flex items-center gap-4'>
                                        <div className='w-[50px] h-[50px]'>
                                            <img 
                                            src={`/products/${tn?.transactionItem?.image}`} 
                                            alt="avatar" 
                                            className='w-full h-full object-cover rounded-full' 
                                            />
                                        </div>
                                        <div className='text-sm'>
                                            <p>{tn?.transactionItem?.title}</p>
                                            {/* <span className='text-xs text-primaryLight'>catalogapp.io</span> */}
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 ">
                                    <div className='flex  flex-col'>
                                    <h5 className='font-medium'>{tn?.transactionBy?.name}</h5>
                                    <p>{tn?.transactionBy?.email}</p>
                                    </div>
                                </td>
                                <td className="p-4">
                                    ${tn?.amount?.toFixed(2)}
                                </td>
                                <td className="p-4">
                                    {moment(tn?.createdAt).format('MMMM DD YYYY')}
                                </td>
                                <td className="p-4 ">
                                    <div className='flex items-center gap-6 text-secondary'>
                                        {tn?.description}
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


