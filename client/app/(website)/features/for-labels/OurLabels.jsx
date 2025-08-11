"use client";
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import { Autoplay, Pagination } from 'swiper/modules';
import Image from 'next/image';

import {Anton} from 'next/font/google';

import ourlabel1 from '@/public/images/forlabels/ourlabel1.png';
import ourlabel2 from '@/public/images/forlabels/ourlabel2.png';
import ourlabel3 from '@/public/images/forlabels/ourlabel3.png';
import ourlabel4 from '@/public/images/forlabels/ourlabel4.png';
import ourlabel5 from '@/public/images/forlabels/ourlabel5.png';
import { Anton } from 'next/font/google';

const anton = Anton({
    weight: ['400'],    
    subsets: ['latin']
});

const data =[
    {image : ourlabel1 , name : "Santali Safar" , proffession : "Record Label"},
    {image : ourlabel2 , name : "Akhil" , proffession : "Singer"},
    {image : ourlabel3 , name : "Kush Hell Mix" , proffession : "Music Producer"},
    {image : ourlabel4 , name : "Vivek Verma" , proffession : "Music Producer"},
    {image : ourlabel5 , name : "Kush Hell Mix" , proffession : "Music Producer"},
    {image : ourlabel1 , name : "Kush Hell Mix" , proffession : "Music Producer"},
    {image : ourlabel4 , name : "Kush Hell Mix" , proffession : "Music Producer"},
    {image : ourlabel2 , name : "Kush Hell Mix" , proffession : "Music Producer"},
]

export default function OurLabels() {
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
            // pauseOnMouseEnter: true,
            // disableOnInteraction: false
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
        //  // Add mouse enter and leave event listeners
        //  swiper.el.addEventListener('mouseenter', () => {
        //  if (swiper.autoplay)  swiper.autoplay.stop(); // Pause autoplay on mouse enter
        // });
        // swiper.el.addEventListener('mouseleave', () => {
        //  if (swiper.autoplay) swiper.autoplay.start(); // Resume autoplay on mouse leave
        // });
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
            <Image src={item.image} alt={item.name} className="w-[200px] h-[200px] object-contain rounded-lg mb-4" />
            <h3 className={`text-4xl  font-semibold ${anton.className}`}>{item.name}</h3>
            <p className="text-gray-500 ">{item.proffession}</p>
           </SwiperSlide>
          
        ))}
        
      </Swiper>
    </>
  );
}
