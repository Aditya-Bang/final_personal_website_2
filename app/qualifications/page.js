import React from 'react'
import Navbar from '@/components/Navbar'

const Qualifications = () => {
  return (
    <div className='flex flex-col h-screen items-center p-5'>
    <Navbar/>
    <div className='flex items-center w-full h-full justify-center mt-5'>
      <div className='flex flex-col h-full w-full bg-white p-10 rounded-2xl gap-5'>
        <div className='flex flex-row basis-10/12 gap-5'>
          <div className='text-white rounded-2xl bg-red-500 basis-8/12 p-5'>Experiences</div>
          <div className='text-white rounded-2xl bg-green-500 basis-4/12 p-5'>Certifications</div>
        </div>

        <div className='text-white rounded-2xl bg-blue-500 basis-2/12 p-5 flex items-center justify-center gap-5'>
          <div>Technologies</div>
          <div>More STUFF</div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Qualifications