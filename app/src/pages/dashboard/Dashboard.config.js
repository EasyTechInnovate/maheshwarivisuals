import { ArrowRight, BarChart3, DollarSign, IndianRupee, Megaphone, Music, Play, Upload, Video } from 'lucide-react';

// Data for Monthly Earnings (Line Chart)
  export const earningsData = [
    { month: 'Jan', earnings: 15000 },
    { month: 'Feb', earnings: 22000 },
    { month: 'Mar', earnings: 18000 },
    { month: 'Apr', earnings: 25000 },
    { month: 'May', earnings: 28000 },
    { month: 'Jun', earnings: 45000 },
  ];

  // Data for Monthly Streams (Bar Chart)
  export const streamsData = [
    { month: 'Jan', streams: 150000 },
    { month: 'Feb', streams: 220000 },
    { month: 'Mar', streams: 180000 },
    { month: 'Apr', streams: 320000 },
    { month: 'May', streams: 280000 },
    { month: 'Jun', streams: 400000 },
  ];

  // Data for Video Tutorials
  export const videoTutorials = [
    {
      title: "Uploading Your First Release",
      duration: "12.53",
      views: "12.5K views"
    },
    {
      title: "Understanding Analytics Dashboard",
      duration: "5.53",
      views: "12.5K views"
    },
    {
      title: "Setting Up Marketing Campaigns",
      duration: "10.23",
      views: "12.5K views"
    },
    {
      title: "Maximizing Your Royalty Earnings",
      duration: "9.53",
      views: "12.5K views"
    }
  ];

  // Data for Recent Releases
  export const recentReleases = [
    {
      title: "Midnight Dreams",
      artist: "Artist Name",
      streams: "45.2K streams",
      status: "Live",
      statusColor: "bg-green-500"
    },
    {
      title: "Ocean Waves",
      artist: "Artist Name",
      streams: "32.1K streams",
      status: "Processing",
      statusColor: "bg-yellow-500"
    },
    {
      title: "City Lights",
      artist: "Artist Name",
      streams: "78.3K streams",
      status: "Live",
      statusColor: "bg-green-500"
    }
  ];

  // Data for Quick Actions
  export const quickActions = [
    {
      title: "Upload New Release",
      subtitle: "Share your music with the world",
      icon: Upload,
      iconColor: "text-purple-500",
      path: "/app/upload-release"
    },
    {
      title: "View Analytics",
      subtitle: "Track your performance",
      icon: BarChart3,
      iconColor: "text-blue-500",
      path: "/app/analytics"
    },
    {
      title: "Start Campaign",
      subtitle: "Promote your music",
      icon: Megaphone,
      iconColor: "text-orange-500",
      path: "/app/advertisement"
    },
    {
      title: "Join MCN",
      subtitle: "Boost your earnings",
      icon: DollarSign,
      iconColor: "text-green-500",
      path: "/app/youtube-mcn"
    }
  ];

  // Data for This Month's Performance
  export const performanceMetrics = [
    {
      title: "Streaming Goal",
      current: "1.56L",
      target: "2L streams",
      percentage: 78,
      color: "bg-purple-500"
    },
    {
      title: "Revenue Goal",
      current: "₹32,450",
      target: "₹50,000",
      percentage: 65,
      color: "bg-blue-500"
    },
    {
      title: "Fan Engagement",
      current: "Excellent performance",
      target: "",
      percentage: 92,
      color: "bg-green-500"
    }
  ];
