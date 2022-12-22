import axios from 'axios';

export const deleteUser = async (userId) => {
    const { data : { data : { message } } } = await axios.delete(`/api/admin/delete-user/${userId}`)
    return message;
}