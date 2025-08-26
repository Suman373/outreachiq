import { AXIOS_GET } from "./axiosClient";

export const fetchUserData = async(id)=>{
    try {
        const data = await AXIOS_GET(`/users/${id}`);
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}
