import React from 'react'
import { Route, Routes } from 'react-router-dom'
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

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/app' element={<Index />}>
          <Route index element={<Dashboard />} />
          <Route path='upload-release' element={<UploadRelease />} />
          <Route path='upload-release/basic-release-builder' element={<BasicReleaseBuilder />} />
          <Route path='upload-release/advanced-release-builder' element={<AdvancedReleaseBuilder />} />
          <Route path='catalog' element={<CatalogPage />} />
          <Route path='analytics' element={<Analytics />} />
          <Route path='royalties' element={<Royalties />} />
          <Route path='finance-and-wallet' element={<FinanceWallet />} />
          <Route path='finance-and-wallet/withdraw-fund' element={<WithdrawFund />} />
          <Route path='youtube-mcn' element={<YouTubeMCN />} />
          <Route path='youtube-mcn/new-request' element={<YouTubeMCNRequest />} />
          <Route path='mv-production' element={<MVProduction />} />
          <Route path='mv-marketing' element={<MVMarketing />} />
          <Route path='advertisement' element={<Advertisement />} />
          <Route path='merch' element={<MerchStore />} />
          <Route path='help' element={<HelpSupport />} />
          <Route path='settings' element={<SettingsPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
