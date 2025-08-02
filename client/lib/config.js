import config from '@/config';
import { 
  Activity
} from 'lucide-react';

export const appConfig = {
  company: {
    name: "EasyTechInnovate",
    fullName: "EasyTechInnovate API Status",
    tagline: "Real-time Trading Platform Monitoring",
    description: "Comprehensive overview of our trading platform services and endpoints",
    uptimeTarget: "99.9%"
  },

  api: {
    baseURL: config.apiUrl,
    healthCheckInterval: 30000, 
    version: "v1"
  },

  // Theme Configuration
  theme: {
    primaryColor: "rgba(19,255,160,0.6)",
    backgroundColor: "black",
    cardBackground: "gray-900/50",
    borderColor: "gray-700/50"
  },

  services: [
    {
      id: 'health',
      name: 'System Health',
      icon: Activity,
      color: 'from-green-400 to-green-600',
      healthEndpoint: '/health',
      description: 'Core system monitoring and self-check functionality',
      endpoints: [
        'Service Self-Check', 
        'General Health Status'
      ]
    },
  ],

  statusMessages: {
    checking: 'Checking system status...',
    allOperational: 'All systems operational',
    partialOutage: 'Some services experiencing issues',
    majorOutage: 'Multiple services down',
    unknown: 'System status unknown'
  },

  monitoring: {
    realTimeUpdates: "Status refreshes every 30 seconds",
    serviceCoverage: "Complete trading platform ecosystem"
  },

  healthDisplay: {
    showDetailedMetrics: true,
    showSystemInfo: true,
    showApplicationInfo: true,
    metricsToShow: {
      uptime: true,
      memoryUsage: true,
      cpuUsage: true,
      environment: true,
      responseTime: true
    }
  }
};

export const getTotalEndpoints = () => {
  return appConfig.services.reduce((total, service) => total + service.endpoints.length, 0);
};

export const buildApiUrl = (endpoint) => {
  return `${appConfig.api.baseURL}/${appConfig.api.version}${endpoint}`;
};