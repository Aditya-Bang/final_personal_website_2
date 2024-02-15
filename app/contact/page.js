import React from 'react'

import { Quantico } from 'next/font/google';

const quantico = Quantico({
    subsets: ["latin"],
    display: 'swap',
    weight: '400',
  });

const Contact = () => {
  return (
    <div className={`${quantico.className} text-7xl`}>Contact Me</div>
  )
}

export default Contact