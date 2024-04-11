import React from 'react'
import "./stylestest/StarBG2.scss"

const StarBG2 = () => {
    return (
        <div className='absolute h-full w-full z-0'>
            <div class="z-0 background-container">
                <div className="stars"></div>
                <div className="twinkling"></div>
            </div>
        </div>
    )
}

export default StarBG2