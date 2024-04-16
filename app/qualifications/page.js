import React from 'react'
import Navbar from '@/components/Navbar'
import CertificationCard from '@/components/CertificationCard'
import ExperienceCard from '@/components/ExperienceCard'
import certifications from "../../writing/certifications.json"
import experiences from "../../writing/experiences.json"
import awards from "../../writing/awards.json"
import AwardCard from '@/components/AwardCard'

const Qualifications = () => {
  return (
    <div className='flex flex-col h-screen items-center p-5'>
      <Navbar />

      <div className='flex flex-col lg:flex-row w-full h-full gap-2 lg:gap-5 mt-5 lg:overflow-hidden'>
        <div className='flex flex-col basis-8/12 gap-2'>
          <div className='flex flex-col rounded-lg bg-gray-900 p-2 gap-2 overflow-hidden grow'>
            <div className='flex flex-row items-center justify-center gap-5 pr-5 pl-5 w-full'>
              <div className="flex-grow h-[1px] w-auto bg-[#3b426b] rounded-full "></div>
              <p className='text-2xl uppercase text-white'>Experiences</p>
              <div className="flex-grow h-[1px] w-auto bg-[#3b426b] rounded-full"></div>
            </div>
            <div className='flex flex-row flex-wrap gap-2 overflow-auto scrollbar justify-center'>
              {experiences.map((experience, key) => (
                <ExperienceCard name={experience.name} date={experience.date} description={experience.description} key={`Certification ${key}`} />
              ))}
            </div>
          </div>

          <div className='flex flex-col md:flex-row justify-center items-center bg-gray-900 rounded-lg min-h-[100px] gap-2 md:gap-5 p-2 md:p-0'>
            <div className='flex flex-row items-center justify-center gap-5 pr-5 pl-5 w-full max-w-[350px]'>
              <div className="flex-grow h-[1px] w-auto bg-[#3b426b] rounded-full "></div>
              <p className='text-2xl uppercase text-white'>Awards</p>
              <div className="flex-grow h-[1px] w-auto bg-[#3b426b] rounded-full"></div>
            </div>
            {awards.map((award, key) => (
              <AwardCard name={award.name} date={award.date} key={`Award ${key}`}/>
            ))}
          </div>
        </div>

        <div className='flex flex-col rounded-lg bg-gray-900 basis-4/12 p-2 lg:overflow-auto scrollbar'>
          <div className='flex flex-row items-center justify-center gap-5 pr-5 pl-5 w-full'>
            <div className="flex-grow h-[1px] w-auto bg-[#3b426b] rounded-full "></div>
            <p className='text-2xl uppercase text-white'>Certifications</p>
            <div className="flex-grow h-[1px] w-auto bg-[#3b426b] rounded-full "></div>
          </div>
          <div className='flex flex-col scrollbar gap-2'>
            {certifications.map((certification, key) => (
              <CertificationCard name={certification.name} description={certification.description} provider={certification.provider} credential={certification.credential} key={`Certification ${key}`} />
            ))}
          </div>

        </div>

      </div>



    </div>
  )
}

export default Qualifications