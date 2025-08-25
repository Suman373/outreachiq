import { AXIOS_POST } from './axiosClient';

export const registerUser = async (name, email, password) => {
    try {
        const data = await AXIOS_POST(`/users/register`,{name,email, password});
        return data;
    } catch (error) {
        throw error.response?.data || error;
    }
}

export const loginUser = async (email, password) => {
    try {
        const data = await AXIOS_POST(`/users/login`,{email,password});
        return data;
    } catch (error) {
        throw error.response?.data || error;
    }
}



