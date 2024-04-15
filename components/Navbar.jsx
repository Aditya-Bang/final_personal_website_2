"use client"

import React from 'react'

import { AnimatePresence, motion } from "framer-motion";
import { useState } from 'react';
import Link from 'next/link';
import { FiExternalLink  } from "react-icons/fi";

// import { Quantico } from 'next/font/google';
// const quantico = Quantico({
//     subsets: ["latin"],
//     display: 'swap',
//     weight: '700',
// });
// import { Orbitron } from 'next/font/google';
// const orbitron = Orbitron({
//     subsets: ["latin"],
//     weight: '600'
// });
// import { Courier_Prime } from 'next/font/google';
// const courier_prime = Courier_Prime({
//     subsets: ["latin"],
//     weight: '400'
// });
import { Anonymous_Pro } from 'next/font/google';
const anonymous_pro = Anonymous_Pro({
    subsets: ["latin"],
    weight: '700'
});

const links = [
    {
        name: "Home",
        link: "/",
    },
    {
        name: "About",
        link: "/about",
    },
    {
        name: "Projects",
        link: "/projects",
    },
    {
        name: "Qualifications",
        link: "/qualifications",
    },
    {
        name: "Contact",
        link: "/contact",
    },
]

const Navbar = () => {
    const [hoverIndex, setHoverIndex] = useState(null);

    return (
        <div className='flex items-center justify-evenly flex-row w-full'>
            <div className='text-white w-full'>Aditya Bang's Personal Website</div>
            <div className='flex flex-row shadow-lg-invert border text-white rounded-full p-2 items-center justify-center'>
                {links.map((link, index) => {

                    return (
                        <div key={index}>
                            <div
                                className="relative flex pr-4 pl-4 pt-1 pb-1"
                                onMouseEnter={() => setHoverIndex(index)}
                                onMouseLeave={() => setHoverIndex(null)}
                            >
                                <Link href={link.link} className={`font-bold z-20 text-gray-200 hover:text-white uppercase`}>{link.name}</Link>
                                <AnimatePresence>
                                    {hoverIndex === index && (
                                        <motion.span
                                            className="absolute inset-0 h-full w-full bg-gradient-to-r from-violet-600 to-indigo-600 block rounded-full"
                                            layoutId="hoverBackground"
                                            initial={{ opacity: 0 }}
                                            animate={{
                                                opacity: 1,
                                                transition: { duration: 0.15 },
                                            }}
                                            exit={{
                                                opacity: 0,
                                                transition: { duration: 0.15, delay: 0.2 },
                                            }}
                                        />
                                    )}
                                </AnimatePresence>

                            </div>
                        </div>
                    );
                })}
            </div>

            <div className='text-white w-full flex flex-row justify-end gap-5'>
                <div className="relative group">
                    <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-400 group-hover:h-full group-hover:transition-all"></span>
                    <span className='relative z-20'>
                        <Link className='flex flex-row justify-center items-center gap-2' href='/'>
                            <p>Linkedin</p>
                            <FiExternalLink />
                        </Link>
                    </span>
                </div>
                <div className="relative group">
                    <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-400 group-hover:h-full group-hover:transition-all"></span>
                    <span className='relative z-20'>
                        <Link className='flex flex-row justify-center items-center gap-2' href='/'>
                            <p>My Resume</p>
                            <FiExternalLink />
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Navbar