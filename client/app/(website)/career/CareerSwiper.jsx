"use client";
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Anton} from 'next/font/google';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import { Autoplay, Pagination } from 'swiper/modules';
import swip1 from '@/public/images/career/swip1.png'
import swip2 from '@/public/images/career/swip2.png'
import swip3 from '@/public/images/career/swip3.png'
import Image from 'next/image';

const anton = Anton({
    weight: ['400'],
    subsets: ['latin']
});

const data =[ swip1 , swip2 , swip3 , swip1 , swip2 ,swip3]

export default function CareerSwiper() {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        draggable={true}
        modules={[ Autoplay]}
        autoplay= {{
            delay: 3000,
        }}
       
        breakpoints= {{
            320: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            480: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 2.5,
                spaceBetween: 30
            },
            
        }}
        className="mySwiper"
      >
        {data.map((item, index) => (
          <SwiperSlide key={index} className="flex flex-col items-center justify-items-center space-y-3 text-white uppercase text-center"> 
            <Image src={item} alt={index} className="w-[450px] h-[300px] object-cover object-center rounded-lg mb-4" />
            
           </SwiperSlide>
          
        ))}
        
      </Swiper>
    </>
  );
}
