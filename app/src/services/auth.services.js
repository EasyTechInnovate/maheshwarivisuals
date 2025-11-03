import { servicesAxiosInstance } from "./config";


export const refreshAccessToken = async (refreshToken) => {
    const response = await servicesAxiosInstance.post('/auth/refresh-token', {
        refreshToken: refreshToken
    });
    return response.data;
};

export const getUserProfile = async () => {
    const response = await servicesAxiosInstance.get('/auth/profile');
    return response.data;
};
