import React from 'react'
import Navbar from '@/components/Navbar'
import CertificationCard from '@/components/CertificationCard'
import ExperienceCard from '@/components/ExperienceCard'
import certifications from "../../writing/certifications.json"
import experiences from "../../writing/experiences.json"

const Qualifications = () => {
  return (
    <div className='flex flex-col h-screen items-center p-5'>
      <Navbar />
      <div className='flex items-center w-full h-full justify-center mt-5'>
        <div className='flex flex-col h-full w-full rounded-lg gap-5'>
          <div className='flex flex-row basis-10/12 gap-5'>

            <div className='flex flex-col rounded-lg bg-gray-900 basis-8/12 p-2'>
              <div className='flex flex-row items-center justify-center gap-5 pr-5 pl-5 w-full'>
                <div className="flex-grow h-[1px] w-auto bg-[#3b426b] rounded-full "></div>
                <p className='text-2xl uppercase text-white'>Experiences</p>
                <div className="flex-grow h-[1px] w-auto bg-[#3b426b] rounded-full "></div>
              </div>
              <div className='flex flex-row flex-wrap'>
                {certifications.map((key, experience) => (
                  <ExperienceCard key={`Certification ${key}`} />
                ))}
              </div>

            </div>

            <div className='flex flex-col rounded-lg bg-gray-900 basis-4/12 p-2'>
              <div className='flex flex-row items-center justify-center gap-5 pr-5 pl-5 w-full'>
                <div className="flex-grow h-[1px] w-auto bg-[#3b426b] rounded-full "></div>
                <p className='text-2xl uppercase text-white'>Certifications</p>
                <div className="flex-grow h-[1px] w-auto bg-[#3b426b] rounded-full "></div>
              </div>
              {certifications.map((key, certification) => (
                <CertificationCard key={`Certification ${key}`} />
              ))}
            </div>

          </div>

          <div className='text-white rounded-lg bg-blue-500 basis-2/12 p-5 flex items-center justify-center gap-5'>
            <div>Awards</div>
            <div>More STUFF</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Qualifications