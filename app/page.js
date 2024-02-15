'use client';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { useEffect, useState } from "react";

import IntroLoadingScreen from '@/components/IntroLoadingScreen';
import IntroLoadingAnimation from '@/components/IntroLoadingAnimation';

const ETscale = 100;

const LoadingTest = () => {
    const [textData, setTextData] = useState(null);
    const [earthData, setEarthData] = useState(null);


    useEffect(() => {
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

        setTimeout(() => {
            loadText2();
            loadEarth();
        }, 400);

    }, [])

    return (
        <div>
            {textData && earthData ? <IntroLoadingAnimation earthModel={earthData} textModel={textData} /> : <IntroLoadingScreen />}
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