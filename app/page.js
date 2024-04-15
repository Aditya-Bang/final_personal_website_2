'use client';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';

import IntroLoadingScreen from '@/components/IntroLoadingScreen';
import IntroLoadingAnimation from '@/components/IntroLoadingAnimation';
import Loader from '@/components/Loader';

const ETscale = 100;

const LoadingTest = () => {
    const [textData, setTextData] = useState(null);
    const [earthData, setEarthData] = useState(null);
    const [animationPlayed, setAnimationPlayed] = useState(false);
    const [animationFinished, setAnimationFinished] = useState(false);
    const [playCnt, setPlayCnt] = useState(0);

    function loadText2() {
        const textLoader = new GLTFLoader();
        textLoader.load(
            './name/curvedname.glb',

            function (gltf) {
                gltf.scene.scale.set(40, 40, 40);
                setTextData(gltf.scene);
                console.log("Finished Loading Text");

            },
            function (xhr) {
                //console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            function (error) { console.log('An error happened', error); }
        );
    }

    function loadEarth() {
        const earthLoader = new GLTFLoader();
        earthLoader.load(
            './planet/scene.gltf',

            function (gltf) {
                gltf.scene.scale.set(ETscale, ETscale, ETscale);
                setEarthData(gltf.scene);
                console.log("Finished Loading Earth");
            },
            function (xhr) {
                //console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            function (error) { console.log('An error happened', error); }
        );
    }

    const fetchAnimationPlayed = async () => {
        try {
            const sessionStorageAnimationPlayed = await sessionStorage.getItem('animationPlayed');
            const animationPlayedBurner = sessionStorageAnimationPlayed ? sessionStorageAnimationPlayed : 'false';
            if (animationPlayedBurner == 'true') {
                setAnimationPlayed(true);
                setAnimationFinished(true);
            } else {
                setAnimationPlayed(false);
            }
            // console.log(animationPlayedBurner, 'before timeout')
            // setTimeout(() => {
            //     console.log(animationPlayedBurner, "after timeout");
            // }, 1000);


            if (animationPlayed) {

                if (!textData) loadText2();
                if (!earthData) loadEarth();
            }
            else {
                sessionStorage.setItem('animationPlayed', 'true');

                setTimeout(() => {
                    if (!textData) loadText2();
                    if (!earthData) loadEarth();
                }, 400);

                setTimeout(() => {
                    // setAnimationPlayed(true);
                    setAnimationFinished(true);
                }, 16000);
            }

        } catch (error) {
            console.error('Error fetching animationPlayed:', error);
        }
    }

    useEffect(() => {
        fetchAnimationPlayed();
    }, [])

    const handleReplay = () => {
        setPlayCnt(playCnt + 1);
        // setAnimationPlayed(true);
        setAnimationPlayed(false);
        setAnimationFinished(false);
        setTimeout(() => {
            // setAnimationPlayed(true);
            setAnimationFinished(true);
        }, 15500);
    }

    // const replayAnimation = async () => {
    //     console.log("Replaying Animation");
    //     sessionStorage.setItem('animationPlayed', 'false');
    //     setBtnDisabled(true);
    //     setAnimationPlayed("false");
    //     fetchAnimationPlayed();
    // }
    // <button hidden={btnDisabled} className='text-white absolute z-50' onClick={() => replayAnimation()}>Replay Animation</button>
    // const [btnDisabled, setBtnDisabled] = useState(true);

    return (
        <div>

            {animationPlayed ?
                <div>
                    {textData && earthData ?
                        <div>
                            <IntroLoadingAnimation key="animationhasplayed" earthModel={earthData} textModel={textData} animationPlayed={true} />
                        </div>
                        :
                        <div className='h-screen flex items-center justify-center'><Loader /></div>
                    }
                </div>
                :
                <div>
                    {textData && earthData ?
                        <div>
                            <IntroLoadingAnimation key={playCnt} earthModel={earthData} textModel={textData} animationPlayed={false} />
                        </div>
                        :
                        <IntroLoadingScreen />
                    }
                </div>
            }
            {textData && earthData && animationFinished ?
                <div className={`absolute bottom-0 right-0 text-white`}>
                    {animationPlayed ?
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleReplay}
                            className='z-10 m-10 bg-blue-500 pt-1 pb-1 pl-2 pr-2 rounded-lg border text-white'>
                            Replay Animation
                        </motion.button>
                        :
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                        >
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleReplay}
                                className='z-10 m-10 bg-blue-500 pt-1 pb-1 pl-2 pr-2 rounded-lg border text-white'>
                                Replay Animation
                            </motion.button>
                        </motion.div>
                    }

                </div>
                : <div />}

        </div>

    )
}

export default LoadingTest;

// {isLoading ?
//     <div className='absolute text-white'>Loading</div> :
//     <>
//         <div className='absolute text-white'>Finished Loading</div>
//         <div ></div>
//     </>
// }

// {isLoading && <div className='inset-0 h-full overflow-hidden'></div>}