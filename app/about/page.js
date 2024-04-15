import React from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';
import MyLinks from '@/components/MyLinks';

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
    <div className='flex flex-col h-screen items-center p-5 gap-5'>
      <Navbar />
      <div className={`flex flex-row w-full h-full text-gray-300 overflow-hidden gap-2`}>
        <div className='flex flex-col w-full h-full rounded-lg p-5 bg-gray-900 gap-5 overflow-auto scrollbar'>
          <div className='flex flex-row items-center justify-center gap-5 pr-5 pl-5'>
            <div className="flex-grow h-[1px] w-auto bg-[#3b426b] rounded-full "></div>
            <p className='text-5xl uppercase text-white'>About Me</p>
            <div className="flex-grow h-[1px] w-auto bg-[#3b426b] rounded-full "></div>
          </div>

          <p className='text-xl'>
            Hello and welcome to my personal website. I'm Aditya Bang, and I'm currently a second-year&nbsp;<span className='text-blue-400'>Co-op computer science</span>&nbsp;student at the&nbsp;<span className='text-blue-400'>University of Waterloo</span>.
          </p>
          <p className='text-xl'>
            My interests revolve around programming, mathematics, and physics. So far, I've mainly created full-stack projects, some of which involve AI. My curiosity extends to understanding the mathematical principles behind AI through reading research papers. Additionally, I'm keen on competitive programming, particularly in graph theory, and exploring pure mathematics in my classes at UWaterloo.
          </p>
          <p className='text-xl'>
            Beyond academics, I enjoy swimming and got my Bronze Cross Assistant lifeguard certification in 2019. I also like watching basketball.
          </p>
          <p className='text-xl'>
            Currently, I'm seeking internships for the Fall of 2024. Please don't hesitate to&nbsp;

            <div className="relative group inline-flex">
              <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-400 group-hover:h-full group-hover:transition-all"></span>
              <span className='relative z-20'>
                <Link className='flex flex-row justify-center items-center' href='/contact'>
                  <p>contact me</p>
                  <FiExternalLink />
                </Link>
              </span>
            </div>

            . Thank you for taking the time to explore my personal website.
          </p>
        </div>

        <div className='flex flex-col items-center justify-center rounded-lg p-5 w-[500px] overflow-auto scrollbar gap-5 bg-gray-900'>
          <div className='text-center text-sm text-gray-400'>My high school graduation at White Oaks Secondary School in Oakville, Ontario.</div>
          <MyLinks />
        </div>

      </div>
    </div>
  )
}

export default About