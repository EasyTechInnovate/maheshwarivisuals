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

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/user' element={<Index/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='upload-release' element={<UploadRelease/>}/>
          <Route path='catalog' element={<CatalogPage/>}/>
          <Route path='analytics' element={<Analytics/>}/>
          <Route path='royalties' element={<Royalties/>}/>
          <Route path='finance-and-wallet' element={<FinanceWallet/>}/>
          <Route path='finance-and-wallet/withdraw-fund' element={<WithdrawFund/>}/>
          <Route path='youtube-mcn' element={<YouTubeMCN/>}/>
          <Route path='youtube-mcn/new-request' element={<YouTubeMCNRequest/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
