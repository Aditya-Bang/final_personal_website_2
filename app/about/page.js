import React from 'react';
import Navbar from '@/components/Navbar';

import { Quantico } from 'next/font/google';
const quantico = Quantico({
    subsets: ["latin"],
    display: 'swap',
    weight: '700',
});

const About = () => {
  return (
    <div className='flex flex-col h-screen items-center p-5 gap-5 pr-10 pl-10'>
      <Navbar/>
      <div className={`${quantico.className} flex w-full h-full rounded-lg p-5`}>
        Hello
      </div>
    </div>
  )
}

export default About