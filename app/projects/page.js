"use client"

import React from 'react'
import ProjectCard2 from '@/components/ProjectCard2'
import projects from "../../writing/projects.json"
import Technology2 from '@/components/Technology2'

import { AnimatePresence, motion } from "framer-motion";
import { useState } from 'react';
import Navbar from '@/components/Navbar';

const Projects = () => {
    const [hoverIndex, setHoverIndex] = useState(null);

    return (
        <div className='flex flex-col p-5 h-screen pl-20 pr-20 overflow-hidden'>
            <Navbar />

            <div className='flex flex-row h-full w-full mt-5 gap-5'>
                <div className='flex flex-col p-2 grow border rounded-lg'>
                    <div className='flex flex-row items-center justify-center gap-20 pr-10 pl-10 w-full'>
                        <div className="flex-grow h-[1px] w-auto bg-[#3b426b] rounded-full "></div>
                        <p className='text-5xl uppercase text-white'>Projects</p>
                        <div className="flex-grow h-[1px] w-auto bg-[#3b426b] rounded-full "></div>
                    </div>
                    <div className='flex flex-row justify-center items-center h-full'>
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
                                                    className="absolute inset-0 w-full bg-[#212B33] block rounded-xl"
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
                </div>

                <div className='w-[350px] min-w-[300px] flex flex-col p-2 rounded-lg border gap-5'>
                    <div className='flex w-full flex-row items-center justify-center gap-5 pr-5 pl-5'>
                        <div className="flex-grow h-[1px] w-auto bg-[#3b426b] rounded-full"></div>
                        <div className='text-2xl uppercase text-center text-white'>Technologies</div>
                        <div className="flex-grow h-[1px] w-auto bg-[#3b426b] rounded-full "></div>
                    </div>
                    <Technology2 />
                </div>
            </div>
        </div>
    )
}

export default Projects