import React, { Suspense } from "react";
import Image from 'next/image'
import technologies from "../writing/technologies.json"

const Technology2 = () => {
    return (
        <div className='flex flex-wrap justify-center flex-row gap-1 overflow-auto scrollbar'>
            {technologies.map((technology) => (
                <div className='flex flex-col justify-center w-[72px] h-[80px] items-center text-white bg-gray-800 rounded-lg hover:bg-gray-700' key={technology.name}>
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