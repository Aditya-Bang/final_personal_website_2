'use client';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { useEffect, useState } from "react";

import IntroLoadingScreen from '@/components/IntroLoadingScreen';
import IntroLoadingAnimation from '@/components/IntroLoadingAnimation';
import Loader from '@/components/Loader';

const ETscale = 100;

const LoadingTest = () => {
    const [textData, setTextData] = useState(null);
    const [earthData, setEarthData] = useState(null);
    const [animationPlayed, setAnimationPlayed] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(true);

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
            function (error) {console.log('An error happened', error);}
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
            function (error) {console.log('An error happened', error);}
        );
    }

    const fetchAnimationPlayed = async () => {
        try {
            const sessionStorageAnimationPlayed = await sessionStorage.getItem('animationPlayed');
            const animationPlayedBurner = sessionStorageAnimationPlayed ? sessionStorageAnimationPlayed : 'false';
            if (animationPlayedBurner == 'true') setAnimationPlayed(true);
            else setAnimationPlayed(false);
            console.log(animationPlayed);

            if (animationPlayed) {

                if (!textData) loadText2();
                if (!earthData) loadEarth();
                setBtnDisabled(false);

            }
            else {
                sessionStorage.setItem('animationPlayed', 'true');

                setTimeout(() => {
                    if (!textData) loadText2();
                    if (!earthData) loadEarth();
                }, 400);

                setTimeout(() => {
                    setAnimationPlayed('true');
                    setBtnDisabled(false);
                }, 15000);
            }

        } catch (error) {
            console.error('Error fetching animationPlayed:', error);
        }
    }

    useEffect(() => {
        fetchAnimationPlayed();
    }, [])

    const replayAnimation = async () => {
        console.log("Replaying Animation");
        sessionStorage.setItem('animationPlayed', 'false');
        setBtnDisabled(true);
        setAnimationPlayed("false");
        fetchAnimationPlayed();
    }

    return (
        <div>
            <button hidden={btnDisabled} className='text-white absolute z-50' onClick={() => replayAnimation()}>Replay Animation</button>
            {animationPlayed ?
                <div>
                    {textData && earthData ?
                        <div>
                            <IntroLoadingAnimation earthModel={earthData} textModel={textData} animationPlayed={true} />
                        </div>
                        :
                        <div className='h-screen flex items-center justify-center'><Loader /></div>
                    }
                </div>
                :
                <div>
                    {textData && earthData ?
                        <div>
                            <IntroLoadingAnimation earthModel={earthData} textModel={textData} animationPlayed={false} />
                        </div>
                        :
                        <IntroLoadingScreen />
                    }
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