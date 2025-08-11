import Footer from '@/components/website/Footer'
import WebsiteHeader from '@/components/website/Header'
import React from 'react'

const WebsiteLayout = ({children}) => {
  return (
    <div>
      <WebsiteHeader/>
      <main className='bg-[#151A27]'>{children}</main>
      <Footer/>
    </div>
  )
}

export default WebsiteLayout
