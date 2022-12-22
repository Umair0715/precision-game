import axios from 'axios';

export const createPayment = async (cartItems , toast , setButtonText , setLoading) => {

    try {
        setButtonText('Redirecting...')
        const { data : { link } } = await axios.post('/api/payment/pay' , { 
            products : cartItems?.map(item => (
                {
                    name : item?.title ,
                    sku : item?._id,
                    price : item?.price ,
                    currency : 'USD' ,
                    quantity : 1 
                }
            )) ,
            amount : cartItems.reduce((acc , x) => Math.round(acc + Number(x.price)) , 0) ,
        } , {
            headers : {
                'content-type' : 'application/json'
            }
        });
        localStorage.setItem('orderAmount' , cartItems.reduce((acc , x) => Math.round(acc + Number(x.price)) , 0));
        window.location.href = link;
        setLoading(false);
    } catch (err) {
        setLoading(false);
        setButtonText('Pay Now');
        JSON.parse(localStorage.getItem('currentOrders')).forEach( async item => {
            return await axios.delete(`/api/order/${item?._id}`)
        });
        localStorage.setItem('currentOrders' , JSON.stringify([]));
        console.log('create Payment error' , err);
        toast.error(err?.response?.data?.message || err?.message || 'something went wrong.');
    }
}