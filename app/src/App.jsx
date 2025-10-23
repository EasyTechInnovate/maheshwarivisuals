import React, { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useQuery } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'

import { queryClient } from './lib/queryClient'
import { useAuthStore } from './store/authStore'
import { getUserProfile } from './services/auth.services'

import Index from './pages/Index'
import Dashboard from './pages/dashboard/Dashboard'
import UploadRelease from './pages/uploadRelease/UploadRelease'
import CatalogPage from './pages/catalog/Catalog'
import Analytics from './pages/analytics/Analytics'
import Royalties from './pages/royalties/Royalties'
import FinanceWallet from './pages/financeAndWallet/FinanceWallet'
import WithdrawFund from './pages/financeAndWallet/WithdrawFund'
import YouTubeMCN from './pages/youtubeMCN/YoutubeMCN'
import YouTubeMCNRequest from './pages/youtubeMCN/YoutubeMCNRequest'
import MVProduction from './pages/mvProduction/MVProduction'
import MVMarketing from './pages/mvMarketing/MVMarketing'
import Advertisement from './pages/advertisement/Advertisement'
import MerchStore from './pages/merchStore/MerchStore'
import HelpSupport from './pages/helpSupport/HelpSupport'
import SettingsPage from './pages/setting/Setting'
import BasicReleaseBuilder from './pages/uploadRelease/Basic'
import AdvancedReleaseBuilder from './pages/uploadRelease/Advance'

// Authentication wrapper component
const AuthProvider = ({ children }) => {
  const { setUser, setAuthenticated, setLoading, clearAuth } = useAuthStore();

  // Fetch user profile on app load
  const { isLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfile,
    enabled: !!localStorage.getItem('accessToken'), // Only run if token exists
    retry: 1,
    onSuccess: (data) => {
      if (data?.data?.user) {
        setUser(data.data.user);
      }
    },
    onError: () => {
      clearAuth();
    }
  });

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      setLoading(false);
      setAuthenticated(false);
    }
  }, [setLoading, setAuthenticated]);

  // Show loading screen while authenticating
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading...
      </div>
    );
  }

  return children;
};

// Protected routes wrapper
const ProtectedRoutes = () => {
  const { isAuthenticated, isLoading , user } = useAuthStore();

  if (!isAuthenticated && !isLoading && user.role !== 'user' ) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route path='/app' element={<Index/>}>
        <Route index element={<Dashboard/>}/>
        <Route path='upload-release' element={<UploadRelease/>}/>
        <Route path='upload-release/basic-release-builder' element={<BasicReleaseBuilder/>}/>
        <Route path='upload-release/advanced-release-builder' element={<AdvancedReleaseBuilder/>}/>
        <Route path='catalog' element={<CatalogPage/>}/>
        <Route path='analytics' element={<Analytics/>}/>
        <Route path='royalties' element={<Royalties/>}/>
        <Route path='finance-and-wallet' element={<FinanceWallet/>}/>
        <Route path='finance-and-wallet/withdraw-fund' element={<WithdrawFund/>}/>
        <Route path='youtube-mcn' element={<YouTubeMCN/>}/>
        <Route path='youtube-mcn/new-request' element={<YouTubeMCNRequest/>}/>
        <Route path='mv-production' element={<MVProduction/>}/>
        <Route path='mv-marketing' element={<MVMarketing/>}/>
        <Route path='advertisement' element={<Advertisement/>}/>
        <Route path='merch' element={<MerchStore/>}/>
        <Route path='help' element={<HelpSupport/>}/>
        <Route path='settings' element={<SettingsPage/>}/>
      </Route>
    </Routes>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProtectedRoutes />
      </AuthProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          // Default options
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
            fontSize: '14px',
            padding: '8px 16px',
            borderRadius: '8px',
            maxWidth: '400px',
          },
          // Success
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          // Error
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
          // Loading
          loading: {
            iconTheme: {
              primary: '#3b82f6',
              secondary: '#fff',
            },
          },
        }}
      />
      {/* <ReactQueryDevtools initialIsOpen={false} />   */}
    </QueryClientProvider>
  )
}

export default App
