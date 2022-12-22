


const tabs = [
    {
        id : 1 ,
        name : 'Transactions'
    },
    {
        id : 2 ,
        name : 'Withdraw Requests' 
    },
]

const WalletTabs = ({ activeTab , setActiveTab }) => {

    return (
        <div className='border border-primaryLight rounded-md flex items-center w-fit'>
            {
                tabs?.map((tab,i) => (
                    <div 
                    key={tab?.id}
                    className={`py-2 px-4 border-r border-r-primaryLight cursor-pointer text-primary
                    ${tabs?.length - 1 === i ? 'border-none' : ''} 
                    ${activeTab === tab?.id ? 'bg-primary text-black font-semibold' : ''}
                    `}
                    onClick={() => setActiveTab(tab?.id)} 
                    >
                        {tab?.name}
                    </div>
                ))
            }
        </div>
    )
}

export default WalletTabs