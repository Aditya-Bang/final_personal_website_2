import React from 'react'

const ProjectCard2 = (props) => {
    return (
        <div className='p-4'>
            <div className="max-w-64 border border-gray-400 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative">
                <img className="rounded-t-lg" src={props.image} alt={props.alt} />

                <a href={props.source_code_link} target="_blank" className='absolute rounded-full bg-black border-2 border-black top-0 right-0 m-1 h-12 w-12'>
                    <img
                        src='./assets/github2.png'
                        alt='source code'
                        className='object-contain'
                    />
                </a>

                {props.demo ?
                    <a href={props.demo} target="_blank" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 absolute top-0 left-0 m-2 mt-3">
                        Demo
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </a> : <div />}



                <div className="p-5">
                    <div>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.name}</h5>
                    </div>

                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{props.description}</p>


                    {/*color options are blue, gray, red, green, yellow, purple, indigo, pink*/}
                    <div className="flex flex-wrap gap-2 mt-2">
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
        </div>
    )
}

export default ProjectCard2