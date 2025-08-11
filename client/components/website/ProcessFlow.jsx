"use client"
import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

// This is the main component that orchestrates the process flow.
const ProcessFlow = ({ data }) => {
  return (
    <div className='w-full p-20 relative'>
      {/* Central vertical line */}
      <div className='w-1 h-[85%] bg-[#652CD6] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-0'></div>

      {data.map((item, index) => (
        <ProcessStep key={index} item={item} index={index} />
      ))}
    </div>
  );
};

// A separate component for each step to handle its own animation.
const ProcessStep = ({ item, index }) => {
  const ref = useRef(null);
  // useInView hook to detect when 80% of the component is in the viewport.
  const isInView = useInView(ref, { amount: 0.8, once: true }); 

  // Variants for animating the left-side content.
  const leftSideVariants = {
    hidden: { opacity: 0, x: -200 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // Variants for animating the right-side content.
  const rightSideVariants = {
    hidden: { opacity: 0, x: 200 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div
      ref={ref}
      className={`flex justify-center items-center gap-20 mb-10 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
    >
      {/* Content on the left side (or right side if reversed) */}
      <motion.div
        className='w-[350px] h-[250px] flex justify-center items-center z-10'
        variants={index % 2 === 1 ? rightSideVariants : leftSideVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <Image src={item.image} alt={item.heading} className='h-full object-contain' />
      </motion.div>

      {/* The step number dot in the center */}
      <div className='w-12 h-12 rounded-full bg-[#652CD6] flex items-center justify-center relative text-white font-semibold z-10'>
        {index + 1}
      </div>

      {/* Content on the right side (or left side if reversed) */}
      <motion.div
        className='w-[350px] h-[250px] flex flex-col justify-center z-10'
        variants={index % 2 === 1 ? leftSideVariants : rightSideVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <h1 className='font-semibold text-white text-lg mb-4'>{item.heading}</h1>
        <p className='text-gray-300 text-sm'>{item.text}</p>
      </motion.div>
    </div>
  );
};

export default ProcessFlow;
