'use client';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { useEffect, useState } from "react";

import IntroLoadingScreen from '@/components/IntroLoadingScreen';
import IntroLoadingAnimation from '@/components/IntroLoadingAnimation';

import IntroHeader from '@/components/IntroHeader';

const ETscale = 100;

const LoadingTest = () => {
    const [textData, setTextData] = useState(null);
    const [earthData, setEarthData] = useState(null);
    const [animationPlayed, setAnimationPlayed] = useState(false);


    useEffect(() => {
        const fetchAnimationPlayed = async () => {
            try {
                const sessionStorageAnimationPlayed = sessionStorage.getItem('animationPlayed');
                const animationPlayedBurner = sessionStorageAnimationPlayed ? sessionStorageAnimationPlayed : 'false';
                console.log(animationPlayedBurner);

                if (animationPlayedBurner == 'true') {

                    if (!textData) loadText2();
                    if (!earthData) loadEarth();
                    setAnimationPlayed(true);

                }
                else {
                    sessionStorage.setItem('animationPlayed', 'true');

                    setTimeout(() => {
                        if (!textData) loadText2();
                        if (!earthData) loadEarth();
                    }, 400);

                    setTimeout(() => {
                        setAnimationPlayed('true');
                    }, 12500)
                }

            } catch (error) {
                console.error('Error fetching animationPlayed:', error);
            }
        }

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

                function (error) {
                    console.log('An error happened', error);
                }
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

                function (error) {
                    console.log('An error happened', error);
                }
            );
        }

        fetchAnimationPlayed();

    }, [])

    const replayAnimation = () => {
        console.log("Replaying Animation");
        sessionStorage.setItem('animationPlayed', 'false')
        setAnimationPlayed('false');
    }

    return (
        <div>
            <button className='text-white absolute z-50' onClick={() => replayAnimation()}>Replay Animation</button>
            {animationPlayed ?
                <div>
                    {textData && earthData ?
                        <div>
                            <IntroLoadingAnimation earthModel={earthData} textModel={textData} animationPlayed={true} />
                        </div>
                        :null
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