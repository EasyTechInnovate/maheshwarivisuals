import { servicesAxiosInstance } from "./config"

export const getServerHealth = async () => {
    const response = await servicesAxiosInstance.get('/health')
    return response.data
}

// Release APIs
export const createRelease = async (trackType) => {
    const response = await servicesAxiosInstance.post('/releases/create', {
        trackType
    })
    return response.data
}

export const updateReleaseStep1 = async (releaseId, data) => {
    const response = await servicesAxiosInstance.patch(`/releases/${releaseId}/step1`, data)
    return response.data
}

export const updateReleaseStep2 = async (releaseId, data) => {
    const response = await servicesAxiosInstance.patch(`/releases/${releaseId}/step2`, data)
    return response.data
}

export const updateReleaseStep3 = async (releaseId, data) => {
    const response = await servicesAxiosInstance.patch(`/releases/${releaseId}/step3`, data)
    return response.data
}

export const submitRelease = async (releaseId) => {
    const response = await servicesAxiosInstance.post(`/releases/${releaseId}/submit`)
    return response.data
}

// Advanced Release APIs
export const createAdvancedRelease = async (releaseType) => {
    const response = await servicesAxiosInstance.post('/advance-releases/create', {
        releaseType
    })
    return response.data
}

export const updateAdvancedReleaseStep1 = async (releaseId, data) => {
    const response = await servicesAxiosInstance.patch(`/advance-releases/${releaseId}/step1`, data)
    return response.data
}

export const updateAdvancedReleaseStep2 = async (releaseId, data) => {
    const response = await servicesAxiosInstance.patch(`/advance-releases/${releaseId}/step2`, data)
    return response.data
}

export const updateAdvancedReleaseStep3 = async (releaseId, data) => {
    const response = await servicesAxiosInstance.patch(`/advance-releases/${releaseId}/step3`, data)
    return response.data
}

export const submitAdvancedRelease = async (releaseId) => {
    const response = await servicesAxiosInstance.post(`/advance-releases/${releaseId}/submit`)
    return response.data
}

