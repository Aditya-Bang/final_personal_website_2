"use client"

import React from 'react'

import { AnimatePresence, motion } from "framer-motion";
import { useState } from 'react';
import Link from 'next/link';
import { FiExternalLink  } from "react-icons/fi";
import { usePathname } from 'next/navigation'
import resume from "../writing/resume.json"

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
    const pathname = usePathname()
    const [hoverIndex, setHoverIndex] = useState(pathname);

    return (
        <div className='flex items-center justify-evenly flex-col gap-2 lg:gap-0 lg:flex-row w-full'>
            <div className='text-white w-full hidden lg:flex'>Aditya Bang&apos;s Portfolio Website</div>
            <div className='flex flex-row shadow-lg-invert border text-white rounded-full p-2 items-center justify-center md:min-w-[540px] flex-wrap'>
                {links.map((link, index) => {
                    return (
                        <div key={`Navbar link ${index}`}>
                            <div
                                className="relative flex"
                                onMouseEnter={() => setHoverIndex(index)}
                                onMouseLeave={() => setHoverIndex(pathname)}
                            >
                                <Link href={link.link} className={`font-bold z-20 ${link.link === pathname ? 'text-white' : 'text-gray-200'} hover:text-white pr-4 pl-4 pt-1 pb-1 rounded-full uppercase`}>{link.name}</Link>
                                <AnimatePresence>
                                    {(hoverIndex === index || hoverIndex === link.link) && (
                                        <motion.span
                                            className="absolute inset-0 h-full w-full bg-gradient-to-r from-violet-600 to-indigo-600 block rounded-full"
                                            layoutId="hoverBackgroundNavbar"
                                        />
                                    )}
                                </AnimatePresence>

                            </div>
                        </div>
                    );
                })}
            </div>

            <div className='text-white w-full flex-row justify-center lg:justify-end gap-5 flex'>
                <div className="relative group">
                    <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-400 group-hover:h-full group-hover:transition-all"></span>
                    <span className='relative z-20'>
                        <Link className='flex flex-row justify-center items-center gap-2' target='_blank' href='https://www.linkedin.com/in/adi-bang/'>
                            <p>Linkedin</p>
                            <FiExternalLink />
                        </Link>
                    </span>
                </div>
                <div className="relative group">
                    <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-400 group-hover:h-full group-hover:transition-all"></span>
                    <span className='relative z-20'>
                        <Link className='flex flex-row justify-center items-center gap-2' target='_blank' href={resume.link}>
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