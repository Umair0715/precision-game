import { 
    GET_PACKAGES_REQUEST ,
    GET_PACKAGES_SUCCESS ,
    GET_PACKAGES_FAIL ,
}
from '../constants/packageConstants';
import axios from 'axios';

export const fetchAllPackages = (setPackages) => async dispatch => {
    dispatch({ type : GET_PACKAGES_REQUEST });
    try {
        const { data : { data : { packages } } } = await axios.get('/api/admin/package');
        dispatch({ type : GET_PACKAGES_SUCCESS , payload : packages });
        setPackages(packages);
    } catch (error) {
        dispatch({ type : GET_PACKAGES_FAIL , payload : error?.response?.data?.message || 'something went wrong.'})
    }
};