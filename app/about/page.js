"use client"

import React from 'react';
import Navbar from '@/components/Navbar';

const About = () => {
  return (
    <div className='flex flex-col h-screen items-center p-5 gap-5 pr-10 pl-10'>
      <Navbar/>
      <div className='flex w-full h-full bg-green-500 rounded-lg p-5'>
        Hello
      </div>
    </div>
  )
}

export default About