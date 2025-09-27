import { AXIOS_POST } from "./axiosClient"

export const enhanceSubject = async (userId, subject) => {
    try {
        const data = await AXIOS_POST(`/ai/${userId}/subject`, { subject });
        return data;
    } catch (error) {
        throw error.response?.data || error;
    }
}

export const enhanceBody = async(userId, body)=>{
    try {
        const data = await AXIOS_POST(`/ai/${userId}/body`, {body});
        return data;
    } catch (error) {
        throw error?.response?.data ||error;
    }
}