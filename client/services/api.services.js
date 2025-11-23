import { servicesAxiosInstance } from "./config"

// ============= Health Check =============
export const getServerHealth = async () => {
    const response = await servicesAxiosInstance.get('/health')
    return response.data
}

// ============= Authentication APIs =============

/**
 * Register a new user (Artist or Label)
 * @param {Object} userData - User registration data
 * @returns {Promise} Response with user data and tokens
 */
export const registerUser = async (userData) => {
    const response = await servicesAxiosInstance.post('/auth/register', userData)
    return response.data
}

/**
 * Login a user
 * @param {Object} credentials - User login credentials (emailAddress, password)
 * @returns {Promise} Response with user data and tokens
 */
export const loginUser = async (credentials) => {
    const response = await servicesAxiosInstance.post('/auth/login', credentials)
    return response.data
}

/**
 * Get user profile
 * @returns {Promise} Response with user profile data
 */
export const getUserProfile = async () => {
    const response = await servicesAxiosInstance.get('/auth/profile')
    return response.data
}

// ============= Subscription APIs =============

/**
 * Get all subscription plans
 * @returns {Promise} Response with list of subscription plans
 */
export const getSubscriptionPlans = async () => {
    const response = await servicesAxiosInstance.get('/subscription/plans')
    return response.data
}

/**
 * Create payment intent for subscription
 * @param {Object} paymentData - Payment data with planId
 * @returns {Promise} Response with payment intent details
 */
export const createPaymentIntent = async (paymentData) => {
    const response = await servicesAxiosInstance.post('/subscription/create-payment-intent', paymentData)
    return response.data
}

/**
 * Verify payment after Razorpay transaction
 * @param {Object} verificationData - Razorpay payment verification data
 * @returns {Promise} Response with verification status
 */
export const verifyPayment = async (verificationData) => {
    const response = await servicesAxiosInstance.post('/subscription/verify-payment', verificationData)
    return response.data
}
