// Mock data for now, replace with API calls later
const NewsletterData = {
  stats: {
    totalSubscribers: { value: 28400, change: 14.2 },
    openRate: { value: 68.7, change: 8.3 },
    clickRate: { value: 12.4, change: 51.1 },
    newslettersSent: { value: 127, change: 23 },
  },
  users: [
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh.kumar@maheshwarivisuals.com",
      phone: "7668009623",
      subscription: "Base",
      status: "Active",
      joinDate: "2023-01-15",
      lastActive: "2024-01-28",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@maheshwarivisuals.com",
      phone: "7668009623",
      subscription: "Base",
      status: "Active",
      joinDate: "2023-03-22",
      lastActive: "2024-01-28",
    },
    {
      id: 3,
      name: "Amit Patel",
      email: "amit.patel@maheshwarivisuals.com",
      phone: "7668009623",
      subscription: "Pro",
      status: "Active",
      joinDate: "2023-06-10",
      lastActive: "2024-01-27",
    },
    {
      id: 4,
      name: "Sneha Gupta",
      email: "sneha.gupta@maheshwarivisuals.com",
      phone: "7668009623",
      subscription: "Base",
      status: "Away",
      joinDate: "2023-08-05",
      lastActive: "2024-01-25",
    },
    {
      id: 5,
      name: "Vikram Singh",
      email: "vikram.singh@maheshwarivisuals.com",
      phone: "7668009623",
      subscription: "Base",
      status: "Inactive",
      joinDate: "2023-11-12",
      lastActive: "2024-01-20",
    },
  ],
};

export default NewsletterData;
