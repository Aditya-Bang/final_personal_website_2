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
      <Navbar />
      <div className={`${quantico.className} flex flex-row w-full h-full rounded-lg bg-white`}>
        <div className='flex flex-col w-full h-full rounded-lg p-5 border '>
          <p className='text-3xl underline'>Who Am I?</p>
          <p className='text-xl'>
            Hi, my name is Aditya Bang. I am currently a second year&nbsp;
            <span className='text-red-500'>computer science</span>
            &nbsp;student pursing my bachelor&apos;s degree at the&nbsp;
            <span className='text-red-500'>University of Waterloo</span>
            .
          </p>
          <p className='text-3xl underline'>My Interests</p>
          <p className='text-xl'>
            Full stack development, done a bunch of projects, learning the math behind AI, reading papers, etc. graph theory through competitive programming and pure math which im taking in advanced waterloo math courses
          </p>
          <p className='text-3xl underline'>My Future</p>
          <p className='text-xl'>
            Seeking internships for Fall 2024
          </p>
          
        </div>
        <div className='flex items-center justify-center rounded-lg border p-5'>
          Image
        </div>

      </div>
    </div>
  )
}

export default About