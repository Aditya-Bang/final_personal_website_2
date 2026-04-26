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
        name: "Blogs",
        link: "/blogs",
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
    const isActiveLink = (link) => link === "/" ? pathname === link : pathname.startsWith(link);

    return (
        <div className='flex items-center justify-evenly flex-col gap-2 xl:gap-0 xl:flex-row w-full'>
            <div className='text-white hidden whitespace-nowrap xl:flex xl:flex-1'>Aditya Bang&apos;s Portfolio Website</div>
            <div className='flex max-w-full flex-row flex-wrap items-center justify-center rounded-full border p-2 text-white shadow-lg-invert md:flex-nowrap xl:flex-none'>
                {links.map((link, index) => {
                    return (
                        <div key={`Navbar link ${index}`}>
                            <div
                                className="relative flex"
                                onMouseEnter={() => setHoverIndex(index)}
                                onMouseLeave={() => setHoverIndex(pathname)}
                            >
                                <Link href={link.link} className={`font-bold z-20 ${isActiveLink(link.link) ? 'text-white' : 'text-gray-200'} hover:text-white pr-4 pl-4 pt-1 pb-1 rounded-full uppercase`}>{link.name}</Link>
                                <AnimatePresence>
                                    {(hoverIndex === index || (hoverIndex === pathname && isActiveLink(link.link))) && (
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

            <div className='text-white w-full flex-row justify-center xl:justify-end gap-5 flex xl:flex-1'>
                <div className="relative group">
                    <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-400 group-hover:h-full group-hover:transition-all"></span>
                    <span className='relative z-20'>
                        <Link className='flex flex-row justify-center items-center gap-2 whitespace-nowrap' target='_blank' href='https://www.linkedin.com/in/adi-bang/'>
                            <p>Linkedin</p>
                            <FiExternalLink />
                        </Link>
                    </span>
                </div>
                <div className="relative group">
                    <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-400 group-hover:h-full group-hover:transition-all"></span>
                    <span className='relative z-20'>
                        <Link className='flex flex-row justify-center items-center gap-2 whitespace-nowrap' target='_blank' href={resume.link}>
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