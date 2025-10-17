import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000",
});


axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});




// ---------------------- Health ----------------------
const getHealth = () => axiosClient.get("/v1/health");

// ---------------------- Auth ----------------------
const login = (data) => axiosClient.post("/v1/auth/login", data);




// ---------------------- Subscription Plans ----------------------

const getSubscriptionPlans = (includeInactive = true) =>
  axiosClient.get(`/v1/admin/plans?includeInactive=${includeInactive}`);

const createSubscriptionPlan = async (payload) => {
  try {
    console.log("🌐 [API] Creating plan with payload:", payload);
    const response = await axiosClient.post("/v1/admin/plans", payload);
    console.log("✅ [API] Plan created:", response.data);
    return response;
  } catch (error) {
    console.error(
      "❌ [API] Error creating plan:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const getPlanDetails = (planId) => axiosClient.get(`/v1/plans/${planId}`);

const updatePlan = (planId, updatedData) =>
  axiosClient.put(`/v1/admin/plans/${planId}`, updatedData);

const deletePlan = (planId) => axiosClient.delete(`/v1/admin/plans/${planId}`);

const activatePlan = (planId) => axiosClient.patch(`/v1/admin/plans/${planId}/activate`);

const deactivatePlan = (planId) =>
  axiosClient.patch(`/v1/admin/plans/${planId}/deactivate`);




// ---------------------- FAQs ----------------------

const getFaqs = (page = 1, limit = 10) =>
  axiosClient.get(`/v1/admin/faqs?page=${page}&limit=${limit}`);

const createFaq = (payload) => axiosClient.post("/v1/admin/faqs", payload);

const deleteFaq = (faqId) => axiosClient.delete(`/v1/admin/faqs/${faqId}`);

const updateFaq = (id, data) => axiosClient.put(`/v1/admin/faqs/${id}`, data);

const getFaqById = (faqId) => axiosClient.get(`/v1/admin/faqs/${faqId}`);





// ---------------------- Marketing: Sync Submissions ----------------------


const getPendingSyncSubmissions = () =>
  axiosClient.get("/v1/marketing/admin/sync/submissions/pending");

const getAllSyncSubmissions = (page = 1, limit = 10) =>
  axiosClient.get(`/v1/marketing/admin/sync/submissions?page=${page}&limit=${limit}`);

const reviewSyncSubmission = (submissionId, data) =>
  axiosClient.post(`/v1/marketing/admin/sync/submissions/${submissionId}/review`, data);




// ---------------------- Marketing: Playlist Pitching ----------------------


const getPlayPitching = (store = "Spotify", page = 1, limit = 10) =>
  axiosClient.get(
    `/v1/marketing/admin/playlist-pitching/submissions/store/${store}?page=${page}&limit=${limit}`
  );

const reviewPlayPitching = (submissionId, data) =>
  axiosClient.post(
    `/v1/marketing/admin/playlist-pitching/submissions/${submissionId}/review`,
    data
  );




// ---------------------- Trending Labels (Admin) ----------------------


const getAllTrendingLabels = (page = 1, limit = 10) =>
  axiosClient.get(`/v1/admin/trending-labels?page=${page}&limit=${limit}`);


const getTrendingLabel = (trendingLabelId) =>
  axiosClient.get(`/v1/admin/trending-labels/${trendingLabelId}`);

const updateTrendingLabel = (trendingLabelId, payload) =>
  axiosClient.put(`/v1/admin/trending-labels/${trendingLabelId}`, payload);

const updateTrendingLabelStats = (trendingLabelId, payload) =>
  axiosClient.patch(
    `/v1/admin/trending-labels/${trendingLabelId}/statistics`,
    payload
  );

const updateTrendingLabelStatus = (trendingLabelId, payload) =>
  axiosClient.patch(
    `/v1/admin/trending-labels/${trendingLabelId}/status`,
    payload
  );

const deleteTrendingLabel = (trendingLabelId) =>
  axiosClient.delete(`/v1/admin/trending-labels/${trendingLabelId}`);

const createTrendingLabel = (payload) =>
  axiosClient.post(`/v1/admin/trending-labels`, payload);





export default {
  getHealth,
  getSubscriptionPlans,
  createSubscriptionPlan,
  getPlanDetails,
  updatePlan,
  deletePlan,
  activatePlan,
  deactivatePlan,
  login,
  getFaqs,
  createFaq,
  deleteFaq,
  updateFaq,
  getFaqById,
  getPendingSyncSubmissions,
  getAllSyncSubmissions,
  reviewSyncSubmission,
  getPlayPitching,
  reviewPlayPitching,
  getTrendingLabel,
  updateTrendingLabel,
  updateTrendingLabelStats,
  updateTrendingLabelStatus,
  deleteTrendingLabel,
  createTrendingLabel,
  getAllTrendingLabels,
};
