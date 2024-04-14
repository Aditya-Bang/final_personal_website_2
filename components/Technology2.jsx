import React, { Suspense } from "react";
import Image from 'next/image'

const technologies = [
    {
        name: "HTML 5",
        icon: "html",
    },
    {
        name: "Tensorflow",
        icon: "tensorflow"
    },
    {
        name: "CSS3",
        icon: "css",
    },
    {
        name: "JavaScript",
        icon: "javascript",
    },
    {
        name: "TypeScript",
        icon: "typescript",
    },
    {
        name: "React JS",
        icon: "reactjs",
    },
    {
        name: "Redux",
        icon: "redux",
    },
    {
        name: "Tailwind",
        icon: "tailwind",
    },
    {
        name: "Node JS",
        icon: "nodejs",
    },
    {
        name: "MongoDB",
        icon: "mongodb",
    },
    {
        name: "Git",
        icon: "git",
    },
    {
        name: "Figma",
        icon: "figma",
    },
    {
        name: "ThreeJS",
        icon: "threejs"
    },
    {
        name: "Docker",
        icon: "docker",
    },
];



const Technology2 = () => {
    return (
        <div className='flex flex-wrap justify-center flex-row gap-1'>
            {technologies.map((technology) => (
                <div className=' flex flex-col justify-center w-[72px] h-[80px] items-center text-white bg-gray-800 rounded-lg' key={technology.name}>
                    <Image
                        src={`/tech/${technology.icon}.png`}
                        width={40}
                        height={40}
                        alt={`${technology.name} icon`}
                    />
                    <div className="text-xs pt-1 text-gray-200">{technology.name}</div>
                </div>
            ))}
        </div>
    );
};

export default Technology2;