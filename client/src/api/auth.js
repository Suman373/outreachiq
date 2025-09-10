import { AXIOS_GET, AXIOS_POST } from './axiosClient';

export const registerUser = async (name, email, password) => {
    try {
        const data = await AXIOS_POST(`/auth/register`,{name,email, password});
        return data;
    } catch (error) {
        throw error.response?.data || error;
    }
}

export const loginUser = async (email, password) => {
    try {
        const data = await AXIOS_POST(`/auth/login`,{email,password});
        return data;
    } catch (error) {
        throw error.response?.data || error;
    }
}

export const logoutUser = async()=>{
    try {
        const data = await AXIOS_GET(`/auth/logout`,{});
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}

export const getResetLink = async(email)=>{
    try {
        const data = await AXIOS_POST(`/auth/forgot-password`, {email});
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}

export const resetUserPassword = async(newPassword, token)=>{
    try {
        const data = await AXIOS_POST('/auth/reset-password', {newPassword, token});
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}

