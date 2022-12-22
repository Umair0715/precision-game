import {
    GET_PRODUCTS_REQUEST ,
    GET_PRODUCTS_SUCCESS ,
    GET_PRODUCTS_FAIL 
}
from '../constants/productConstants';
import axios from 'axios';

export const createProduct  = async ( productData , setLoading , toast , setProducts , setShowAddItemPopup , setImage ) =>  {
    try {
        setLoading(true);
        const { data : { data : { product } } } = await axios.post('/api/product' , productData , {
            headers : {
                'content-type' : 'application/json'
            }
        });
        setLoading(false);
        setShowAddItemPopup(false);
        setProducts(prev => [product , ...prev]);
        setImage('');
        toast.success('Product created successfully.');
    } catch (err) {
        setLoading(false);
        console.log('create product error' , err);
        toast.error(err?.response?.data?.message || err?.message || 'something went wrong.')
    }
}


export const getProducts = () => async dispatch => {
    console.log('calling')
    try {
        dispatch({ type : GET_PRODUCTS_REQUEST });
        const { data : { data : { products , pages } } } = await axios.get('/api/product' , { 
            headers : {
                'content-type' : 'application/json'
            }
        });
        dispatch({ type : GET_PRODUCTS_SUCCESS , payload : { products , pages } });
    } catch (err) {
        dispatch({ type : GET_PRODUCTS_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message || 'something went wrong.'})
    }
}

export const fetchProducts = (page = 1 , type = '' , keyword = '' , setAllProducts ) => async dispatch =>  {
    try {
        dispatch({ type : GET_PRODUCTS_REQUEST });
        const { data : { data : { products , pages , currentPage } } } = await axios.get(`${
            type && keyword ? `/api/product?pageNumber=${page}&type=${type}&keyword=${keyword}` 
            : type ? `/api/product?pageNumber=${page}&type=${type}` 
            : keyword ? `/api/product?pageNumber=${page}&keyword=${keyword}` : `/api/product?pageNumber=${page}` 
            } ` , { 
            headers : {
                'content-type' : 'application/json'
            }
        });
        dispatch({ type : GET_PRODUCTS_SUCCESS , payload : { products , pages , currentPage } });
        setAllProducts(products);
    } catch (err) {
        dispatch({ type : GET_PRODUCTS_FAIL , payload : err?.response?.data?.message || 'something went wrong.'})
    }
}