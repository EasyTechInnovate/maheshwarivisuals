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

// Get Basic Releases
export const getBasicReleases = async (params) => {
    const { page = 1, limit = 10, status, search, sortOrder = 'desc' } = params
    const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sortOrder
    })

    if (status) queryParams.append('status', status)
    if (search) queryParams.append('search', search)

    const response = await servicesAxiosInstance.get(`/releases/my-releases?${queryParams.toString()}`)
    return response.data
}

// Get Basic Release Details
export const getBasicReleaseDetails = async (releaseId) => {
    const response = await servicesAxiosInstance.get(`/releases/${releaseId}`)
    return response.data
}

// Get Advanced Releases
export const getAdvancedReleases = async (params) => {
    const { page = 1, limit = 10, status, search, sortOrder = 'desc' } = params
    const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sortOrder
    })

    if (status) queryParams.append('status', status)
    if (search) queryParams.append('search', search)

    const response = await servicesAxiosInstance.get(`/advance-releases/my-releases?${queryParams.toString()}`)
    return response.data
}

// Get Advanced Release Details
export const getAdvancedReleaseDetails = async (releaseId) => {
    const response = await servicesAxiosInstance.get(`/advance-releases/${releaseId}`)
    return response.data
}

// Support Ticket APIs
export const createSupportTicket = async (ticketData) => {
    const response = await servicesAxiosInstance.post('/support-tickets', ticketData)
    return response.data
}

export const getMyTickets = async (params) => {
    const { page = 1, limit = 10, status } = params
    const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
    })

    if (status) queryParams.append('status', status)

    const response = await servicesAxiosInstance.get(`/support-tickets/my-tickets?${queryParams.toString()}`)
    return response.data
}

export const getMyTicketStats = async () => {
    const response = await servicesAxiosInstance.get('/support-tickets/my-stats')
    return response.data
}

export const getTicketById = async (ticketId) => {
    const response = await servicesAxiosInstance.get(`/support-tickets/${ticketId}`)
    return response.data
}

export const addTicketResponse = async ({ ticketId, responseData }) => {
    const response = await servicesAxiosInstance.post(`/support-tickets/${ticketId}/response`, responseData)
    return response.data
}

export const addTicketRating = async ({ ticketId, ratingData }) => {
    const response = await servicesAxiosInstance.post(`/support-tickets/${ticketId}/rating`, ratingData)
    return response.data
}

// FAQ APIs
export const getFaqs = async () => {
    const response = await servicesAxiosInstance.get('/faqs')
    return response.data
}

// MCN APIs
export const submitMcnRequest = async (data) => {
    const response = await servicesAxiosInstance.post('/mcn/request', data)
    return response.data
}

export const getMyMcnRequests = async (params) => {
    const { page = 1, limit = 10 } = params
    const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
    })

    const response = await servicesAxiosInstance.get(`/mcn/my-requests?${queryParams.toString()}`)
    return response.data
}

export const getMyMcnChannels = async (params) => {
    const { page = 1, limit = 10 } = params
    const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
    })

    const response = await servicesAxiosInstance.get(`/mcn/my-channels?${queryParams.toString()}`)
    return response.data
}

export const requestMcnRemoval = async (requestId) => {
    const response = await servicesAxiosInstance.post(`/mcn/my-requests/${requestId}/request-removal`)
    return response.data
}


// Fan Links APIs
export const getMyFanLinks = async (params) => {
    const { page = 1, limit = 10 } = params
    const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
    })

    const response = await servicesAxiosInstance.get(`/fan-links/my-links?${queryParams.toString()}`)
    return response.data
}

export const checkFanLinkAvailability = async (customUrl) => {
    const response = await servicesAxiosInstance.get(`/fan-links/check-availability/${customUrl}`)
    return response.data
}

export const createFanLink = async (data) => {
    const response = await servicesAxiosInstance.post('/fan-links/create', data)
    return response.data
}

export const updateFanLink = async (fanLinkId, data) => {
    const response = await servicesAxiosInstance.put(`/fan-links/my-links/${fanLinkId}`, data)
    return response.data
}

// Marketing APIs

// Sync Submissions
export const getMySyncSubmissions = async (params) => {
    const { page = 1, limit = 10 } = params
    const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
    })

    const response = await servicesAxiosInstance.get(`/marketing/sync/my-submissions?${queryParams.toString()}`)
    return response.data
}

export const submitSyncRequest = async (data) => {
    const response = await servicesAxiosInstance.post('/marketing/sync/submit', data)
    return response.data
}

// Playlist Pitching Submissions
export const getMyPlaylistPitchingSubmissions = async (params) => {
    const { page = 1, limit = 10 } = params
    const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
    })

    const response = await servicesAxiosInstance.get(`/marketing/playlist-pitching/my-submissions?${queryParams.toString()}`)
    return response.data
}

export const submitPlaylistPitchingRequest = async (data) => {
    const response = await servicesAxiosInstance.post('/marketing/playlist-pitching/submit', data)
    return response.data
}