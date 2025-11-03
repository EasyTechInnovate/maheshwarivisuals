import { servicesAxiosInstance } from "./config"

export const getServerHealth = async () => {
    const response = await servicesAxiosInstance.get('/health')
    return response.data
}