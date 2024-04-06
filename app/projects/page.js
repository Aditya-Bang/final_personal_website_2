"use client"

import React from 'react'
import ProjectCard2 from '@/components/ProjectCard2'
import projects from "../../writing/projects.json"

import { AnimatePresence, motion } from "framer-motion";
import { useState } from 'react';
import Navbar from '@/components/Navbar';

const Qualifications = () => {
    const [hoverIndex, setHoverIndex] = useState(null);

    return (
        <div className='flex flex-col p-5 h-screen pl-20 pr-20'>
            <Navbar />

            <div className='flex flex-row h-full w-full mt-5'>
                <div className='flex flex-row basis-9/12 justify-center items-center'>
                    {projects.map((project, index) => {
                        return (
                            <div key={index}>
                                <div
                                    className="relative group block p-2 pl-3 pr-3 h-full"
                                    onMouseEnter={() => setHoverIndex(index)}
                                    onMouseLeave={() => setHoverIndex(null)}
                                >
                                    <AnimatePresence>
                                        {hoverIndex === index && (
                                            <motion.span
                                                className="absolute inset-0 w-full bg-neutral-200 dark:bg-[#212B33] block rounded-xl"
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
                                    <ProjectCard2
                                        key={`project-${index}`}
                                        index={index}
                                        name={project.name}
                                        description={project.description}
                                        image={project.image}
                                        alt={project.alt}
                                        tags={project.tags}
                                        source_code_link={project.source_code_link}
                                        demo={project.demo}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='basis-3/12 h-full bg-green-500'>

                </div>
            </div>
        </div>
    )
}

export default Qualifications