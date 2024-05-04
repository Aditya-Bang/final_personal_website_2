import React from 'react'
import Link from 'next/link'
import { FiExternalLink } from 'react-icons/fi'

const CertificationCard = (props) => {
  return (
    <div className='flex h-full bg-gray-800 hover:bg-gray-700 rounded-lg p-2 text-white min-h-[160px] flex-col md:flex-row gap-2'>
      <div className='flex flex-col items-center justify-center min-w-[160px] text-center gap-2'>
        <div className='text-lg font-bold text-blue-400 uppercase'>{props.name}</div>
        <div className='text-xs text-indigo-500 font-bold'>{props.provider}</div>
        <Link className='text-xs bg-blue-600 p-2 rounded-lg' target='_blank' href={props.credential}>
          <div className='flex items-center'>
            View Certification&nbsp;
            <FiExternalLink className='hidden md:flex' />
          </div>
        </Link>
        {/* Include image here maybe */}
      </div>

      <div className='flex h-full items-center justify-center text-gray-300 text-xs'>{props.description}</div>
    </div>
  )
}

export default CertificationCard