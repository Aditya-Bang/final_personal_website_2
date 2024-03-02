"use client"

import React from 'react'

import { AnimatePresence, motion } from "framer-motion";
import { useState } from 'react';

const links = [
    {
        name: "Home",
    },
    {
        name: "About",
    },
    {
        name: "Qualifications",
    },
    {
        name: "Projects",
    },
    {
        name: "Contact",
    },
]

const Navbar = () => {
    const [hoverIndex, setHoverIndex] = useState(null);

    return (
        <div className='flex items-center justify-center'>
            <div className='flex flex-row shadow-lg-invert text-white mt-5 rounded-full p-2 w-1/2 items-center justify-center'>
                {links.map((link, index) => {

                    return (
                        <div>
                            <div
                                className="relative flex pr-4 pl-4 pt-1 pb-1"
                                onMouseEnter={() => setHoverIndex(index)}
                                onMouseLeave={() => setHoverIndex(null)}
                            >
                                <div className='z-20'>{link.name}</div>
                                <AnimatePresence>
                                    {hoverIndex === index && (
                                        <motion.span
                                            className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-[#212B33] block rounded-xl"
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
        </div>
    )
}

export default Navbar