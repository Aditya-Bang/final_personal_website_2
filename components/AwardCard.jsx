import React from 'react'

const AwardCard = (props) => {
  return (
    <div className='bg-gray-800 hover:bg-gray-700 rounded-lg p-2 text-center text-white flex flex-col h-full justify-center items-center'>
        <div className='text-sm font-bold text-blue-400 uppercase'>{props.name}</div>
        <div className='text-xs text-indigo-500 font-bold'>{props.date}</div>
    </div>
  )
}

export default AwardCard