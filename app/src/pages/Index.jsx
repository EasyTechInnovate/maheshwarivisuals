import DashboardLayout from '@/components/DashboardLayout'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Index = () => {
  return (
     <DashboardLayout>
      <Outlet/>
    </DashboardLayout>
  )
}

export default Index
