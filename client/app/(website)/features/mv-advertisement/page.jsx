import Faq from '@/components/website/Faq'
import LetTheWorld from '@/components/website/LetTheWorld'
import React from 'react'
import herobg from '@/public/images/mvadvertisement/herobg.png'
import { FullBox, MainHeadingText, TwoHalfBoxes } from '@/components/FixedUiComponents'
import { Button } from '@/components/ui/button'

import youtube from '@/public/images/mvadvertisement/youtube.png'
import metaads from '@/public/images/mvadvertisement/metaads.png'
import unified from '@/public/images/mvadvertisement/unified.png'
import grow from '@/public/images/mvadvertisement/grow.png'
import unifiedimage from '@/public/images/mvadvertisement/unifiedimage.png'


const page = () => {
  return (
    <div className='overflow-x-hidden '>
      <div style={{ backgroundImage: `url(${herobg.src})` }} className='bg-cover bg-center min-h-screen w-full flex flex-col justify-center items-center pt-[150px]'>
        <MainHeadingText text='The Quickest Way to' text2='Grow Your Fanbase    ' />
        <h1 className='w-[60%] max-md:w-[90%] my-5 text-gray-300 text-center'> Focus on Music. Let AI Handle the Marketing. <br /> Maheswari Express saves time and grows your fanbase—automatically.</h1>
        <Button variant='blue' className='shadow-2xl mt-5 shadow-violet-600'> Start Free Now</Button>
      </div>

       <TwoHalfBoxes
        item1={{
          iconbg: '#632BDF',
          icon: youtube,
          title: 'YouTube Music & Shorts Campaigns',
          items: ["Skippable & Non-Skippable Ads: Target fans by genre, mood, or lyric", "YouTube Shorts Ads: Promote 15-60 sec vertical videos to Gen Z audiences", "Pre-Roll for Music Videos: Appear before trending music videos", "Influencer Collabs: Partner with creators for reaction videos, lyric breakdowns, or dance trends"]
        }}

        item2={{
          iconbg: '#9729CA',
          icon: metaads,
          title: 'Meta Ads (Instagram & Facebook)',
          items: ['Reels Ads: Short-form vertical video ads with music hooks', 'Story Ads: Swipe-up CTAs for pre-saves, merch, or streaming', 'Feed Ads: Targeted by genre, mood, or fan analytics', 'Lookalike Audiences: Reach fans similar to your top listeners', 'Smart Link Retargeting: Show ads to users who clicked your release link']
        }}
      />

      <FullBox
        item1={{
          iconbg: '#CE3AB3',
          icon: unified,
          title: 'Unified Campaign Dashboard',
          items: [
            "Real-time tracking across all platforms",
            "Stream-to-ad spend ratio, fan growth, and ROI",
            "Exportable reports for artists and labels",
            "Automated AI analysis of ad reports"
          ],
          image: unifiedimage
        }}
      />

      <TwoHalfBoxes
        item1={{
          iconbg: '#632BDF',
          icon: grow,
          title: 'Influencer Reels & UGC Campaigns',
          items: [
            "Micro-Influencer Network: Collaborate with creators in music, fashion, or lifestyle",
            "Trend Activation: Launch dance, lyric, or visual trends tied to your song",
            "UGC Licensing: Repurpose influencer content into paid ads",
            "Performance-Based Payouts: Pay per engagement or conversion"
          ]
        }}

        item2={{
          iconbg: '#9729CA',
          icon: grow,
          title: 'Spotify Ads & Growth Tools',
          items: [
            'Audio Ads: Run 15-30 sec ads between songs on Spotify Free',
            'Video Takeover: Full-screen video ads when users are actively Browse',
            'Canvas Integration: Looping visuals with tracks to boost engagement',
            'Sponsored Playlists: Feature artist tracks in curated playlists'
          ]
        }}
      />

      <Faq />
      <LetTheWorld />
    </div>
  )
}

export default page