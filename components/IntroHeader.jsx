"use client"

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { Quantico } from 'next/font/google';

const quantico = Quantico({
  subsets: ["latin"],
  display: 'swap',
  weight: '400',
});

import "./stylestest/test4.scss";

const IntroHeader = (props) => {
  return (
    <div>
      {props.animationPlayed ?
        <div>
          <div className={`${quantico.className} absolute flex flex-col h-full justify-center ml-10 gap-2`}>
            <Link href='/about'>
              <div className="Title ">
                <h1>About
                  <div className="Title__highlight"></div>
                </h1>
                <div className="Title__underline"></div>
                <div aria-hidden className="Title__filled">About</div>
              </div>
            </Link>
            <Link href='/projects'>
              <div className="Title">
                <h1>Projects
                  <div className="Title__highlight"></div>
                </h1>
                <div className="Title__underline"></div>
                <div aria-hidden className="Title__filled">Projects</div>
              </div>
            </Link>
            <Link href='/qualifications'>
              <div className="Title ">
                <h1>Qualifications
                  <div className="Title__highlight"></div>
                </h1>
                <div className="Title__underline"></div>
                <div aria-hidden className="Title__filled">Qualifications</div>
              </div>
            </Link>
            <Link href='/contact'>
              <div className="Title ">
                <h1>Contact
                  <div className="Title__highlight"></div>
                </h1>
                <div className="Title__underline"></div>
                <div aria-hidden className="Title__filled">Contact</div>
              </div>
            </Link>

          </div>
        </div>
        :
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className={`${quantico.className} absolute flex flex-col h-full justify-center ml-10 gap-2`}>
            <Link href='/about'>
              <div className="Title ">
                <h1>About
                  <div className="Title__highlight"></div>
                </h1>
                <div className="Title__underline"></div>
                <div aria-hidden className="Title__filled">About</div>
              </div>
            </Link>
            <Link href='/projects'>
              <div className="Title">
                <h1>Projects
                  <div className="Title__highlight"></div>
                </h1>
                <div className="Title__underline"></div>
                <div aria-hidden className="Title__filled">Projects</div>
              </div>
            </Link>
            <Link href='/qualifications'>
              <div className="Title ">
                <h1>Qualifications
                  <div className="Title__highlight"></div>
                </h1>
                <div className="Title__underline"></div>
                <div aria-hidden className="Title__filled">Qualifications</div>
              </div>
            </Link>
            <Link href='/contact'>
              <div className="Title ">
                <h1>Contact
                  <div className="Title__highlight"></div>
                </h1>
                <div className="Title__underline"></div>
                <div aria-hidden className="Title__filled">Contact</div>
              </div>
            </Link>

          </div>
        </motion.div>
      }
    </div>

  )
}

export default IntroHeader