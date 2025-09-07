import { AXIOS_GET, AXIOS_POST } from './axiosClient';

export const postFlowData = async (flowData, leads) => {
    try {
        const data = await AXIOS_POST(`/flows/schedule`, { flowData, leads });
        return data?.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}

export const getAllFlows = async () => {
    try {
        const data = await AXIOS_GET('/flows/');
        return data?.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}

export const getFlowsByUser = async (userId) => {
    try {
        const data = await AXIOS_GET(`/flows/user/${userId}`);
        return data?.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}

export const getFlowById = async(flowId)=>{
    try {
        const data = await AXIOS_GET(`/flows/${flowId}`);
        return data?.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}



