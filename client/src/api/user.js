import { AXIOS_GET, AXIOS_PATCH } from "./axiosClient";

export const fetchUserData = async (id) => {
    try {
        const data = await AXIOS_GET(`/users/${id}`);
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}

export const updateUserProfileImg = async (id, formData) => {
    try {
        const data = await AXIOS_PATCH(`/users/${id}/profile-image`, formData, {
            headers: {"Content-Type": "multipart/form-data"}
        });
        return data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}
