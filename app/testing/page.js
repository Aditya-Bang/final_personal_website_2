"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";

const BasicsOfMotion = () => {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <div className='h-screen grid place-items-center'>
      <button className='w-20 h-20 rounded-md bg-yellow-500' onClick={() => setIsVisible(!isVisible)}>
        Click Me
      </button>
      {isVisible ? (
        <motion.div
          className='bg-white w-20 h-20'
          initial={{
            rotate: '0deg'
          }}
          transition={{
            duration: '1'
          }}
          animate={{
            rotate: '180deg',
            ease: 'backInOut'
          }}
        ></motion.div>
      ) : <div/>}

    </div>
  );
};

const Testing = () => {
  return (
    <div className='text-white'>
      <BasicsOfMotion />
    </div>
  )
}

export default Testing