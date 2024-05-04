'use client';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { useEffect, useState, useCallback } from "react";
import { motion } from 'framer-motion';

import IntroLoadingScreen from '@/components/IntroLoadingScreen';
import IntroLoadingAnimation from '@/components/IntroLoadingAnimation';
import Loader from '@/components/Loader';
import IntroAnimationMobile from '@/components/IntroAnimationMobile';

const useMediaQuery = (width) => {
    const [targetReached, setTargetReached] = useState(false);

    const updateTarget = useCallback((e) => {
        if (e.matches) {
            setTargetReached(true);
        } else {
            setTargetReached(false);
        }
    }, []);

    useEffect(() => {
        const media = window.matchMedia(`(max-width: ${width}px)`);
        media.addEventListener("change", updateTarget);

        if (media.matches) {
            setTargetReached(true);
        }

        return () => media.removeEventListener("change", updateTarget);
    }, []);

    return targetReached;
};

const ETscale = 100;

const LoadingTest = () => {
    const [textData, setTextData] = useState(null);
    const [earthData, setEarthData] = useState(null);
    const [animationPlayed, setAnimationPlayed] = useState(false);
    const [animationFinished, setAnimationFinished] = useState(false);
    const [playCnt, setPlayCnt] = useState(0);
    const [playIntroLoadingScreen, setPlayIntroLoadingScreen] = useState(false);
    // const [isDesktop, setDesktop] = useState(true);
    const isDesktop = useMediaQuery(1200);

    // const updateMedia = () => {
    //     setDesktop(window.innerWidth > 1200);
    //     console.log()
    // };

    function loadText2() {
        const textLoader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath("/draco/gltf/");//copypasted draco/gltf/all files in public folder
        textLoader.setDRACOLoader(dracoLoader);

        textLoader.load(
            './name/curvedname-v2.glb',

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
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath("/draco/gltf/");//copypasted draco/gltf/all files in public folder
        earthLoader.setDRACOLoader(dracoLoader);
        earthLoader.load(
            './planet/EarthModel-v7.glb',
            // './planet/scene.gltf',

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

                setPlayIntroLoadingScreen(true);
            }
            else {
                setPlayIntroLoadingScreen(false);
                setTimeout(() => {
                    setPlayIntroLoadingScreen(true);
                }, 900);

                sessionStorage.setItem('animationPlayed', 'true');

                if (!textData) loadText2();
                if (!earthData) loadEarth();
                // setTimeout(() => {
                //     if (!textData) loadText2();
                //     if (!earthData) loadEarth();
                // }, 400);

                setTimeout(() => {
                    // setAnimationPlayed(true);
                    setAnimationFinished(true);
                }, 10500);
            }

        } catch (error) {
            console.error('Error fetching animationPlayed:', error);
        }
    }

    useEffect(() => {
        fetchAnimationPlayed();
        // updateMedia();
    }, [])

    // useEffect(() => {
    //     if (typeof window !== "undefined") window.addEventListener("resize", updateMedia);
    //     if (typeof window !== "undefined") return () => window.removeEventListener("resize", updateMedia);
    // })

    const handleReplay = () => {
        setPlayCnt(playCnt + 1);
        // setAnimationPlayed(true);
        setAnimationPlayed(false);
        setAnimationFinished(false);
        setTimeout(() => {
            // setAnimationPlayed(true);
            setAnimationFinished(true);
        }, 9500);
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
            {!isDesktop ?
                <div className='overflow-hidden'>
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
                            {playIntroLoadingScreen && textData && earthData ?
                                <div>
                                    <IntroLoadingAnimation key={`animationHasNotPlayed ${playCnt}`} earthModel={earthData} textModel={textData} animationPlayed={false} />
                                </div>
                                :
                                <IntroLoadingScreen />
                            }
                        </div>
                    }
                    {(textData && earthData && animationFinished) &&
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

                        </div>}
                </div>
                :
                <div className='overflow-hidden'>
                    {animationPlayed ?
                        <div>
                            {textData && earthData ?
                                <div>
                                    <IntroAnimationMobile key="animationhasplayedMobile" earthModel={earthData} textModel={textData} animationPlayed={true} />
                                </div>
                                :
                                <div className='h-screen flex items-center justify-center'><Loader /></div>
                            }
                        </div>
                        :
                        <div>
                            {playIntroLoadingScreen && textData && earthData ?
                                <div>
                                    <IntroAnimationMobile key={`animationHasNotPlayedMobile ${playCnt}`} earthModel={earthData} textModel={textData} animationPlayed={false} />
                                </div>
                                :
                                <IntroLoadingScreen />
                            }
                        </div>
                    }
                    {(textData && earthData && animationFinished) &&
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

                        </div>}
                </div>
            }
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