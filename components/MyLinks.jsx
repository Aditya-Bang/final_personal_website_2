import React from 'react'
import Link from 'next/link';
import { FaGithub } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { IoNewspaperSharp } from "react-icons/io5";
import resume from "../writing/resume.json";

const MyLinks = (props) => {
    return (
        <div className={`flex ${props.type == 'col' ? 'flex-col' : 'flex-row'} bg-gray-900 p-2 gap-3 rounded-3xl`}>
            <Link href='https://github.com/Aditya-Bang' target='_blank'>
                <FaGithub className='text-white w-10 h-10 hover:cursor-pointer hover:text-indigo-600' />
            </Link>
            <Link href='https://www.linkedin.com/in/adi-bang/' target='_blank'>
                <CiLinkedin className='text-white w-10 h-10 hover:cursor-pointer hover:text-indigo-600' />
            </Link>
            <Link href='mailto:a3bang@uwaterloo.ca' target='_blank'>
                <MdEmail className='text-white w-10 h-10 hover:cursor-pointer hover:text-indigo-600' />
            </Link>
            <Link href={resume.link} target='_blank'>
                <IoNewspaperSharp className='text-white w-10 h-10 hover:cursor-pointer hover:text-indigo-600' />
            </Link>
        </div>
    )
}

export default MyLinks