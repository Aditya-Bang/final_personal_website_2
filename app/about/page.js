import React from 'react';
import Navbar from '@/components/Navbar';

// import { Quantico } from 'next/font/google';
// const quantico = Quantico({
//   subsets: ["latin"],
//   display: 'swap',
//   weight: '400',
// });
// import { Anonymous_Pro } from 'next/font/google';
// const anonymous_pro = Anonymous_Pro({
//   subsets: ["latin"],
//   weight: '400'
// });
// import { M_PLUS_1_Code } from 'next/font/google';
// const MFont = M_PLUS_1_Code({
//   subsets: ["latin"],
//   weight: '400'
// })

const About = () => {
  return (
    <div className='flex flex-col h-screen items-center p-5 gap-5 pr-10 pl-10'>
      <Navbar />
      <div className={`flex flex-row w-full h-full text-white bg-gray-900`}>
        <div className='flex flex-col w-full h-full rounded-l-lg p-5 border gap-2'>
          <div className='flex flex-row items-center justify-center gap-5 pr-5 pl-5'>
            <div className="flex-grow h-[1px] w-auto bg-[#3b426b] rounded-full "></div>
            <p className='text-5xl uppercase'>About Me</p>
            <div className="flex-grow h-[1px] w-auto bg-[#3b426b] rounded-full "></div>
          </div>

          <p className='text-xl'>Hello and welcome to my personal website. My name is Aditya Bang and I am currently a second year Co-op computer science student at the University of Waterloo.</p>
          <p className='text-xl'>
            Hi, my name is Aditya Bang. I am currently a second year&nbsp;
            <span className='text-red-500'>computer science</span>
            &nbsp;student pursing my bachelor&apos;s degree at the&nbsp;
            <span className='text-red-500'>University of Waterloo</span>
            .
          </p>
          <p className='text-3xl underline'>My Interests</p>
          <p className='text-xl'>
            Full stack development, please replay the animation (have link here), done a bunch of projects, learning the math behind AI, reading papers, etc. graph theory through competitive programming and pure math which im taking in advanced waterloo math courses
            I am passionate about making projects and have made some involving AI, graph theory, and more.
            Lived in canada for about 10 years, and before that spent a 4 years living in florida and minnisota, and the rest in India.
          </p>
          <p className='text-xl'>Outside the classroom, I am interested in swimming (swimming emoji here) and watching basketball. (basketball emoji here)</p>
          <p className='text-3xl underline'>My Future</p>
          <p className='text-xl'>
            Seeking internships for Fall 2024. Feel free to contact me. (Link here) and thanks for visiting.
          </p>

        </div>
        <div className='flex items-center justify-center rounded-r-lg border p-5'>
          Image
        </div>

      </div>
    </div>
  )
}

export default About