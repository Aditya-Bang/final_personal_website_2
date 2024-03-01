import React from 'react'
import ProjectCard2 from '@/components/ProjectCard2'
import projects from "../projects.json"

const Qualifications = () => {

    return (
        <div className='flex flex-row'>
            {projects.map((project, index) => {
                return (
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
                )
            })}
        </div>
    )
}

export default Qualifications