"use client"

import React from 'react'
import ProjectCard2 from '@/components/ProjectCard2'
import projects from "../projects.json"

import { AnimatePresence, motion } from "framer-motion";
import { useState } from 'react';
import Link from "next/link";

const Qualifications = () => {
    const [hoverIndex, setHoverIndex] = useState(null);

    return (
        <div className='flex flex-row'>
            {projects.map((project, index) => {
                return (
                    <div>
                        <div
                            className="relative group block p-2 h-full w-full"
                            onMouseEnter={() => setHoverIndex(index)}
                            onMouseLeave={() => setHoverIndex(null)}
                        >
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
    )
}

export default Qualifications