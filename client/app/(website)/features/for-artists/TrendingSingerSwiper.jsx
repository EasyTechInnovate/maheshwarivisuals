"use client";
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Anton} from 'next/font/google';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import { Autoplay, Pagination } from 'swiper/modules';
import trending1 from '@/public/images/forartist/trending1.png';
import trending2 from '@/public/images/forartist/trending2.png';    
import trending3 from '@/public/images/forartist/trending3.png';
import trending4 from '@/public/images/forartist/trending4.png';
import trending5 from '@/public/images/forartist/trending5.png';
import Image from 'next/image';

const anton = Anton({
    weight: ['400'],
    subsets: ['latin']
});

const data =[
    {image : trending1 , name : "Kush Hell Mix" , proffession : "Music Producer"},
    {image : trending2 , name : "Akhil" , proffession : "Singer"},
    {image : trending3 , name : "Kush Hell Mix" , proffession : "Music Producer"},
    {image : trending4 , name : "Vivek Verma" , proffession : "Music Producer"},
    {image : trending5 , name : "Kush Hell Mix" , proffession : "Music Producer"},
    {image : trending1 , name : "Kush Hell Mix" , proffession : "Music Producer"},
    {image : trending2 , name : "Kush Hell Mix" , proffession : "Music Producer"},
    {image : trending3 , name : "Kush Hell Mix" , proffession : "Music Producer"},
]

export default function TrendingSingerSwiper() {
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        draggable={true}
        modules={[ Autoplay]}
        autoplay= {{
            delay: 3000,
          }}
        onSwiper={(swiper) => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (!swiper.autoplay) return; 
            if (entry.isIntersecting) {
              swiper.autoplay.start();
            } else {
              swiper.autoplay.stop();
            }
          },
          { threshold: 0.5 }
        );
        observer.observe(swiper.el);
       
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
                slidesPerView: 3,
                spaceBetween: 30
            },
            900:{
                slidesPerView: 4,
                spaceBetween: 30
            }
        }}
        className="mySwiper"
      >
        {data.map((item, index) => (
          <SwiperSlide key={index} className="flex flex-col items-center justify-items-center space-y-3 text-white uppercase text-center"> 
            <Image src={item.image} alt={item.name} className="w-[250px] h-[300px] object-cover rounded-lg mb-4" />
            <h3 className={`text-4xl  font-semibold ${anton.className}`}>{item.name}</h3>
            <p className="text-gray-500 ">{item.proffession}</p>
           </SwiperSlide>
          
        ))}
        
      </Swiper>
    </>
  );
}
