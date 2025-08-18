import { AXIOS_POST } from './axiosClient';

export const postFlowData = async (flowData, leads) => {
    try {
        const data = await AXIOS_POST(`/flows/schedule`,{flowData,leads});
        return data?.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}


