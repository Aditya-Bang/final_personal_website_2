import React from 'react'
import Image from 'next/image';
import { FaExternalLinkAlt } from "react-icons/fa";

const ProjectCard2 = (props) => {
    return (
        <div className='flex flex-col w-[250px] h-[400px] z-20 relative rounded-lg bg-gray-800 border border-gray-600'>
            <div className='w-full h-[120px] overflow-hidden rounded-t-lg relative'>
                <Image
                    src={props.image}
                    fill
                    alt={props.alt}
                    style={{
                        borderTopLeftRadius: "0.5rem",
                        borderTopRightRadius: "0.5rem",
                        objectFit: "cover"
                    }}
                />
            </div>
            <a href={props.source_code_link} target="_blank" className='absolute rounded-full bg-black border-2 border-black top-0 right-0 m-1 h-10 w-10'>
                <img
                    src='./assets/github2.png'
                    alt='source code'
                    className='object-contain'
                />
            </a>
            {props.demo ?
                <a href={props.demo} target="_blank" className="inline-flex items-center p-2 text-sm text-center text-white rounded-lg  focus:ring-4 focus:outline-none bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 absolute top-0 left-0 m-1">
                    Demo&nbsp;
                    <FaExternalLinkAlt />
                </a> : null
            }
            <div className='flex flex-col items-center w-full justify-center p-3 gap-2'>
                <div className="w-full text-xl text-white">{props.name}</div>

                <p className="w-full text-sm font-normal text-gray-700 dark:text-gray-400">{props.description}</p>

                {/*color options are blue, gray, red, green, yellow, purple, indigo, pink*/}
                <div className="w-full flex flex-wrap gap-2 pt-1">
                    {props.tags.map((tag, tagIndex) => {
                        let style;
                        if (tag.color == "blue") {
                            style = "bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300";
                        } else if (tag.color == "gray") {
                            style = "bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-gray-900 dark:text-gray-300";
                        } else if (tag.color == "red") {
                            style = "bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300";
                        } else if (tag.color == "green") {
                            style = "bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300";
                        } else if (tag.color == "yellow") {
                            style = "bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300";
                        } else if (tag.color == "purple") {
                            style = "bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300";
                        } else if (tag.color == "indigo") {
                            style = "bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300";
                        } else {
                            style = "bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300";
                        }
                        return (
                            <span key={`project-${props.index}-tag-${tagIndex}`} className={style}>{tag.name}</span>
                        )
                    })}



                </div>
            </div>



        </div>
    )
}

export default ProjectCard2