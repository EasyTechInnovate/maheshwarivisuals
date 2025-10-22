// Mock data (replace later with API)
export const fetchMerchData = async () => {
  return {
    stats: {
      totalRequests: 4,
      pending: 1,
      approved: 1,
      underReview: 1,
    },
    approvalRequests: [
      {
        id: 1,
        artist: "Rajesh Kumar",
        product: "T-Shirts",
        marketingPlan: "Yes",
        channel: "Instagram",
        mmcAssist: "No",
        status: "Pending",
        date: "2024-03-15",
      },
      {
        id: 2,
        artist: "Chandan Kumar",
        product: "Hoddies",
        marketingPlan: "No",
        channel: "N/A",
        mmcAssist: "Yes",
        status: "Approved",
        date: "2024-03-10",
      },
      {
        id: 3,
        artist: "Rajesh Kumar",
        product: "T-Shirts",
        marketingPlan: "Yes",
        channel: "Youtube",
        mmcAssist: "No",
        status: "Under Review",
        date: "2024-03-08",
      },
      {
        id: 4,
        artist: "Rajesh Kumar",
        product: "T-Shirts",
        marketingPlan: "No",
        channel: "N/A",
        mmcAssist: "Yes",
        status: "Rejected",
        date: "2024-03-05",
      },
    ],

    
  designRequests: [
      {
        id: "MER001",
        user: "Rajesh Kumar",
        type: "Store Setup",
        product: "N/A",
        priority: "High",
        status: "Pending",
        date: "2024-03-15",
      },
      {
        id: "MER002",
        user: "Maheshwari Music",
        type: "Product Upload",
        product: "Band T-Shirt Collection",
        priority: "Medium",
        status: "Approved",
        date: "2024-03-10",
      },
      {
        id: "MER003",
        user: "Sound Aggregators",
        type: "Design Review",
        product: "Custom Hoodies",
        priority: "Medium",
        status: "Under Review",
        date: "2024-03-08",
      },
      {
        id: "MER004",
        user: "Rajesh Kumar",
        type: "Payment Setup",
        product: "N/A",
        priority: "Low",
        status: "Rejected",
        date: "2024-03-05",
      },
    ],
  };
}