import React from 'react'

const IntroLoadingScreen = () => {
    return (
        <div className='fixed top-0 left-0 w-full h-full bg-black text-white flex justify-center items-center'>
            <h1 className="relative w-[max-content] text-3xl font-mono before:absolute before:inset-0 before:animate-typewriter before:bg-black after:absolute after:inset-0 after:w-[0.125em] after:animate-caret after:bg-white">Hello my name is ...</h1>
        </div>
        
    )
}

export default IntroLoadingScreen;