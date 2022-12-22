import axios from 'axios';

export const searchUser = async (keyword) => {
    try {
        const { data : { data : { users } } } = await axios.get(`/api/user/search?keyword=${keyword}`, {
            headers : {
                'content-type' : 'application/json'
            }
        });
        return users ;
    } catch (err) {
        console.log('search user error' , err);
        return err;
    }
}