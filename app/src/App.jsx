import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Index from './pages/Index'
import Dashboard from './pages/dashboard/Dashboard'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/user' element={<Index/>}>
          <Route index element={<Dashboard/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
