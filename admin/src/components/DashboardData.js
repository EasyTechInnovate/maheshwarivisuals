// components/DashboardData.js

export const fetchDashboardData = async () => {
  // simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const totalUsersCount = 12847;
  const userTypeDistribution = [
    { name: "Artists", value: 8240 },
    { name: "Labels", value: 3120 },
    { name: "Distributors", value: 1487 },
  ];

  // calculate percentage
  const userTypeWithPercentage = userTypeDistribution.map((u) => ({
    ...u,
    percentage: ((u.value / totalUsersCount) * 100).toFixed(1) + "%",
  }));

  return {
    totalUsers: {
      count: totalUsersCount,
      change: "+8.2%",
      breakdown: {
        artists: 8240,
        labels: 3120,
        distributors: 1487,
      },
    },
    activeReleases: {
      count: 3429,
      change: "+12.5%",
      breakdown: {
        live: 3201,
        processing: 228,
      },
    },
    monthlyRoyalty: {
      amount: "₹24,73,850",
      change: "-2.1%",
      breakdown: {
        paid: "₹22,15,400",
        pending: "₹2,58,450",
      },
    },
    pendingKYC: {
      count: 347,
      change: "-15.3%",
      breakdown: {
        urgent: 89,
        review: 147,
        missing: 111,
      },
    },
    totalCatalog: {
      count: 45672,
      change: "+18.7%",
      breakdown: {
        songs: 42150,
        albums: 2890,
        singles: 632,
      },
    },
    platformUsage: {
      percentage: "94.3%",
      change: "+3.2%",
      breakdown: {
        peak: "98.7%",
        avg: "94.3%",
        low: "89.1%",
      },
    },
    revenueGrowth: [
      { month: "Jan", value: 1800000 },
      { month: "Feb", value: 2100000 },
      { month: "Mar", value: 1900000 },
      { month: "Apr", value: 2400000 },
      { month: "May", value: 2300000 },
      { month: "Jun", value: 2350000 },
    ],
    platformUsage24h: [
      { time: "00:00", value: 50 },
      { time: "04:00", value: 20 },
      { time: "08:00", value: 75 },
      { time: "12:00", value: 90 },
      { time: "16:00", value: 95 },
      { time: "20:00", value: 88 },
      { time: "23:59", value: 70 },
    ],

    userTypeDistribution: userTypeWithPercentage,

recentActivities: [
  { type: "success", message: "New album 'Midnight Dreams' uploaded by Ravi Sharma", time: "2 min ago" },
  { type: "success", message: "KYC verification completed for 12 new users", time: "15 min ago" },
  { type: "warning", message: "Payment gateway experiencing high latency", time: "32 min ago" },
  { type: "info", message: "5 new label registrations pending approval", time: "1 hr ago" },
  { type: "success", message: "Royalty payout processed for 320 artists", time: "2 hrs ago" },
  { type: "info", message: "System backup completed successfully", time: "3 hrs ago" },
  { type: "success", message: "New distributor 'Melody Corp' onboarded", time: "5 hrs ago" },
  { type: "warning", message: "High memory usage detected on server cluster", time: "6 hrs ago" },
  { type: "info", message: "20 albums moved to pending review", time: "7 hrs ago" },
  { type: "success", message: "1,200 songs indexed in catalog", time: "8 hrs ago" },
  { type: "success", message: "New album 'Ocean Drive' uploaded by Ananya Verma", time: "10 hrs ago" },
  { type: "info", message: "Scheduled maintenance completed", time: "12 hrs ago" },
  { type: "warning", message: "Slow response times detected in API v2", time: "15 hrs ago" },
  { type: "success", message: "50 new users signed up", time: "18 hrs ago" },
  { type: "info", message: "3 label accounts upgraded to premium", time: "20 hrs ago" },
],


    systemHealth: [
      { id: 1, name: "Database", status: "Operational", detail: "Response: 23ms" },
      { id: 2, name: "Payment Gateway", status: "Operational", detail: "Success: 99.8%" },
      { id: 3, name: "CDN", status: "Degraded", detail: "Latency: High" },
      { id: 4, name: "Upload Service", status: "Operational", detail: "Queue: 12 files" },
    ],
  };
};
