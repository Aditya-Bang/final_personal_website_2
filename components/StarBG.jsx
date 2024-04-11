import React from 'react';
import './stylestest/StarBG.css';

// <div id="title">
//         <span>PURE CSS</span>
//         <br />
//         <span>PARALLAX PIXEL STARS</span>
//       </div>

const StarBG = () => {
  return (
    <div className='absolute h-full w-full overflow-hidden'>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
    </div>
  )
}

export default StarBG;