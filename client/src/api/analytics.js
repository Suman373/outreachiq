import { AXIOS_GET } from "./axiosClient";

export const getFlowSummary = async (userId, year) => {
    try {
        const data = await AXIOS_GET(`/analytics/${userId}/summary?year=${year}`);
        return data?.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}

export const getQuickStats = async (userId, year) => {
    try {
        const data = await AXIOS_GET(`/analytics/${userId}/quick-stats?year=${year}`);
        return data?.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}


