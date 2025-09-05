import { AXIOS_GET, AXIOS_PATCH } from "./axiosClient";

export const getUserSettings = async (userId) => {
    try {
        const data = await AXIOS_GET(`/settings/${userId}`);
        return data?.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}

export const patchUserSettings = async (userId, payload) => {
    try {
        const data = await AXIOS_PATCH(`/settings/${userId}`, { payload });
        return data?.data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}