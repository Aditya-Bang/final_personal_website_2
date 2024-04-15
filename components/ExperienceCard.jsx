import React from 'react'

//bg-gradient-to-r from-violet-600 to-indigo-600

const ExperienceCard = (props) => {
  return (
    <div className='bg-gray-800 hover:bg-gray-700 p-2 text-white flex flex-col w-[250px] gap-1 rounded-lg'>
      <div className='text-lg font-bold text-blue-400 uppercase'>{props.name}</div>
      <div className='text-indigo-500 font-bold'>{props.date}</div>
      <div className='text-gray-300 text-sm'>{props.description}</div>
    </div>
  )
}

export default ExperienceCard