'use client';

import { useEffect, useRef, useState } from "react";
import IntroHeader from "./IntroHeader";

import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

var vertexShader = [
    "varying vec2 vUv;",
    "void main() {",
    "vUv = uv;",
    "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
    "}"
].join("\n");

var fragmentShader = [
    "uniform sampler2D baseTexture;",
    "uniform sampler2D bloomTexture;",
    "varying vec2 vUv;",
    "void main() {",
    "gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );",
    "}",
].join("\n");

var glowVertexShader = [
    "varying vec3 vertexNormal;",

    "void main() {",
    "vertexNormal = normalize(normalMatrix * normal);",

    "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
    "}",
].join("\n");

var glowFragmentShader = [
    "varying vec3 vertexNormal;",

    "void main() {",
    "float intensity = pow(0.3 - dot(vertexNormal, vec3(0.0, 0.0, 1.0)), 2.0) * 0.4;",
    "gl_FragColor = vec4(0.22, 0.51, 0.78, 1.0) * intensity;",
    "}"
].join("\n");


const IntroLoadingAnimation = (props) => {
    const mountRef = useRef(null);
    const [mountHeader, setMountHeader] = useState(false);

    useEffect(() => {
        const earthModel = props.earthModel;
        const textModel = props.textModel;
        var animationPlayed = props.animationPlayed;

        const BLOOM_SCENE = 1;

        const bloomLayer = new THREE.Layers();
        bloomLayer.set(BLOOM_SCENE);

        const sunParams = {
            threshold: 0.1,
            strength: 1.124,
            radius: 0.1,
            exposure: 1.059
        };

        const darkMaterial = new THREE.MeshBasicMaterial({ color: 'black' });
        const materials = {};

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        //renderer.toneMapping = THREE.ReinhardToneMapping;
        mountRef.current.appendChild(renderer.domElement);

        const scene = new THREE.Scene();

        // camera movement
        let camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.01, 10000);
        camera.position.set(0, 50, 500);
        camera.lookAt(0, 0, 0);
        let splineCamera, cameraHelper, cameraEye;
        splineCamera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.01, 1000);
        const animationSpeed = 15;
        const direction = new THREE.Vector3();
        const binormal = new THREE.Vector3();
        const normal = new THREE.Vector3();
        const position = new THREE.Vector3();
        const lookAt = new THREE.Vector3();

        let parent, tubeGeometry, mesh;

        const params = {
            spline: 'PipeSpline',
            scale: 5,
            extrusionSegments: 100,
            radiusSegments: 3,
            closed: true,
            animationView: false,
            lookAhead: false,
            cameraHelper: false,
        };

        const tubeMaterial = new THREE.MeshBasicMaterial({ transparent: true, color: 0xfff000 });

        const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0.3, wireframe: true, transparent: true });

        function addTube() {

            if (mesh !== undefined) {

                parent.remove(mesh);
                mesh.geometry.dispose();

            }

            const extrudePath = pipeSpline;

            tubeGeometry = new THREE.TubeGeometry(extrudePath, params.extrusionSegments, 2, params.radiusSegments, params.closed);

            addGeometry(tubeGeometry);

            setScale();

        }

        function setScale() {

            mesh.scale.set(params.scale, params.scale, params.scale);

        }


        function addGeometry(geo) {

            // 3D shape

            mesh = new THREE.Mesh(geo, tubeMaterial);
            const wireframe = new THREE.Mesh(geo, wireframeMaterial);
            //mesh.add(wireframe);
            mesh.material.opacity = 0;
            mesh.layers.set(BLOOM_SCENE);

            parent.add(mesh);

        }

        function animateCamera() {

            cameraHelper.visible = params.cameraHelper;
            cameraEye.visible = params.cameraHelper;

        }

        const pipeSpline = new THREE.CatmullRomCurve3([
            new THREE.Vector3(22, -5, -5),
            new THREE.Vector3(22, -3, 10),
            new THREE.Vector3(20, -1, 16),
            new THREE.Vector3(17, 1, 22),
            new THREE.Vector3(13, 3, 30),
            new THREE.Vector3(8, 5, 38),
            new THREE.Vector3(2, 7, 46),
            new THREE.Vector3(0, 9, 50),
            new THREE.Vector3(0, 9, 58),
            new THREE.Vector3(0, 9, 75),
            new THREE.Vector3(0, 9, 81),
        ]);



        // const controls = new OrbitControls(camera, renderer.domElement);
        // controls.maxPolarAngle = Math.PI * 0.5;
        // controls.minDistance = 1;
        // controls.maxDistance = 100;
        // controls.addEventListener('change', render);

        const renderScene = new RenderPass(scene, splineCamera);

        const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
        bloomPass.threshold = sunParams.threshold;
        bloomPass.strength = sunParams.strength;
        bloomPass.radius = sunParams.radius;

        const bloomComposer = new EffectComposer(renderer);
        bloomComposer.renderToScreen = false;
        bloomComposer.addPass(renderScene);
        bloomComposer.addPass(bloomPass);

        const mixPass = new ShaderPass(
            new THREE.ShaderMaterial({
                uniforms: {
                    baseTexture: { value: null },
                    bloomTexture: { value: bloomComposer.renderTarget2.texture }
                },
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                defines: {}
            }), 'baseTexture'
        );
        mixPass.needsSwap = true;

        const outputPass = new OutputPass();

        const finalComposer = new EffectComposer(renderer);
        finalComposer.addPass(renderScene);
        finalComposer.addPass(mixPass);
        finalComposer.addPass(outputPass);

        // const raycaster = new THREE.Raycaster();
        // const mouse = new THREE.Vector2();
        // window.addEventListener('pointerdown', onPointerDown);


        const ETscale = 100;
        const radius = ETscale * 22 / 30;
        const radiusRootTwo = radius * Math.SQRT2;
        const textHeightOffset = -ETscale / 10;
        const curveHandles = [];
        let flow;
        const initialPoints = [
            { x: radius, y: textHeightOffset, z: radius },
            { x: radiusRootTwo, y: textHeightOffset, z: 0 },
            { x: radius, y: textHeightOffset, z: -radius },
            { x: 0, y: textHeightOffset, z: -radiusRootTwo },
            { x: -radius, y: textHeightOffset, z: -radius },
            { x: -radiusRootTwo, y: textHeightOffset, z: 0 },
            { x: -radius, y: textHeightOffset, z: radius },
            { x: 0, y: textHeightOffset, z: radiusRootTwo },


        ];

        function rotateText2(elapsedT) {
            if (textModel) {
                if (textModel.rotation.y > 0) {
                    textModel.rotation.y -= elapsedT / 2.5;
                } else {
                    textModel.rotation.y = 0;
                }
            }
        }

        function rotateEarth(elapsedT) {
            if (earthModel) earthModel.rotation.y += elapsedT / 2.5;
        }

        setupScene();

        // function onPointerDown(event) {

        //     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        //     mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

        //     raycaster.setFromCamera(mouse, camera);
        //     const intersects = raycaster.intersectObjects(scene.children, false);
        //     if (intersects.length > 0) {

        //         const object = intersects[0].object;
        //         object.layers.toggle(BLOOM_SCENE);
        //         render();

        //     }
        // }

        window.onresize = function () {

            const width = window.innerWidth;
            const height = window.innerHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            splineCamera.aspect = window.innerWidth / window.innerHeight;
            splineCamera.updateProjectionMatrix();

            renderer.setSize(width, height);

            bloomComposer.setSize(width, height);
            finalComposer.setSize(width, height);

            render();

        };



        function setupScene() {

            //scene.traverse(disposeMaterial);
            //scene.children.length = 0;

            // light
            const ambientLight = new THREE.AmbientLight(0xffffff, 0);
            scene.add(ambientLight);
            const light1 = new THREE.DirectionalLight(0xffffff, 10);
            light1.position.set(-120, 0, 100);
            scene.add(light1);

            // camera
            parent = new THREE.Object3D();
            scene.add(parent);
            parent.add(splineCamera);

            cameraHelper = new THREE.CameraHelper(splineCamera);
            scene.add(cameraHelper);

            cameraEye = new THREE.Mesh(new THREE.SphereGeometry(5), new THREE.MeshBasicMaterial({ color: 0xdddddd }));
            parent.add(cameraEye);

            cameraHelper.visible = params.cameraHelper;
            cameraEye.visible = params.cameraHelper;

            // sun
            const geometry = new THREE.IcosahedronGeometry(20, 15);
            const material = new THREE.MeshBasicMaterial({ color: 0xFDB813 });
            const sphere = new THREE.Mesh(geometry, material);
            scene.add(sphere);
            sphere.layers.enable(BLOOM_SCENE)
            sphere.position.x = -60;
            sphere.position.z = -300;
            sphere.position.y = 55;

            // load camera path
            addTube();

            // load earth model and text model
            textModel.rotation.y = Math.PI * 1.10;
            scene.add(earthModel);
            scene.add(textModel);
        }

        // function disposeMaterial(obj) {
        //     if (obj.material) {
        //         obj.material.dispose();
        //     }
        // }

        function render() {

            scene.traverse(darkenNonBloomed);
            bloomComposer.render();
            scene.traverse(restoreMaterial);

            // render the entire scene, then render bloom scene on top
            finalComposer.render();

        }

        function darkenNonBloomed(obj) {
            if (obj.isMesh && bloomLayer.test(obj.layers) === false) {
                materials[obj.uuid] = obj.material;
                obj.material = darkMaterial;
            }
        }

        function restoreMaterial(obj) {
            if (materials[obj.uuid]) {
                obj.material = materials[obj.uuid];
                delete materials[obj.uuid];
            }
        }

        let startTime = Date.now();
        let time, previousTime = Date.now(), elapsedTime;
        let pickNext = 1;
        var t = 0;
        var spCameraX = 0;
        //splineCamera.rotateOnAxis.z += Math.Pi;
        var cameraRotation = -Math.PI / 4;

        var animate = function () {
            requestAnimationFrame(animate);

            // camera.lookAt(0,0,0);
            // camera.rotateZ(cameraRotation); // use this to rotate spline camera
            // cameraRotation += 0.001;

            // todos - camera rotation
            // star background with nebula - look at starbg, starshape, star color randomize, and fog
            // add html/css part of earth video - create replay animation button
            // only iterate time if person is on the tab.

            // animate camera
            time = Date.now();
            elapsedTime = time - previousTime;
            previousTime = time;

            // console.log(time - startTime);
            // console.log(t);
            if (animationPlayed) {
                splineCamera.position.x = -15;
                splineCamera.position.y = 45;
                splineCamera.position.z = 400;
                splineCamera.lookAt(-154, 0, -100);

                textModel.rotation.y = 0;

                if (!mountHeader) setMountHeader(true);                
            } else {
                if (pickNext != 0) {

                    const looptime = animationSpeed * 1000;
                    t += elapsedTime / looptime;
                    t -= Math.floor(t);


                    tubeGeometry.parameters.path.getPointAt(t, position);
                    position.multiplyScalar(params.scale);


                    const segments = tubeGeometry.tangents.length;
                    const pickt = t * segments;
                    const pick = Math.floor(pickt);
                    pickNext = (pick + 1) % segments;

                    binormal.subVectors(tubeGeometry.binormals[pickNext], tubeGeometry.binormals[pick]);
                    binormal.multiplyScalar(pickt - pick).add(tubeGeometry.binormals[pick]);

                    tubeGeometry.parameters.path.getTangentAt(t, direction);
                    const offset = 15;

                    normal.copy(binormal).cross(direction);

                    // we move on a offset on its binormal

                    position.add(normal.clone().multiplyScalar(offset));

                    splineCamera.position.copy(position);
                    cameraEye.position.copy(position);

                    // using arclength for stablization in look ahead
                    // tubeGeometry.parameters.path.getPointAt((t + 30 / tubeGeometry.parameters.path.getLength()) % 1, lookAt);
                    // lookAt.multiplyScalar(params.scale);
                    // camera orientation 2 - up orientation via normal

                    if (!params.lookAhead) lookAt.copy(position).add(direction);
                    //splineCamera.matrix.lookAt(splineCamera.position, lookAt, normal);
                    //splineCamera.matrix.lookAt(0, 0, -50);
                    //splineCamera.quaternion.setFromRotationMatrix(splineCamera.matrix);
                    splineCamera.lookAt(spCameraX, 0, -100);
                    splineCamera.rotateZ(cameraRotation);
                    if (cameraRotation < 0) cameraRotation += elapsedTime / 10000;
                    else cameraRotation = 0; // camera rotation in quadratic - change spline to see further back

                    if (t >= 0.5 && t <= 0.98 && spCameraX > -154) {
                        spCameraX -= elapsedTime * 7 * Math.pow((t - 0.45), 2) * Math.pow((t - 0.986), 2);
                    } else if (t > 0.98) {
                        spCameraX = -154;
                    }

                    if (!mountHeader && t > 0.8) setMountHeader(true);

                    cameraHelper.update();

                } else {
                    animationPlayed = true;
                    t = 1;
                    cameraRotation = -Math.PI / 4;
                    spCameraX = -154;

                    console.log(splineCamera.position.x, splineCamera.position.y, splineCamera.position.z)
                }

                rotateText2(elapsedTime / 1000);
            }



            rotateEarth(elapsedTime / 1000);

            render();
        }

        animate();


        return () => {
            if (mountRef.current != null) {
                mountRef.current.removeChild(renderer.domElement);
            }

        }

    }, [])


    return (
        <div>
            <div className="absolute">
                <div ref={mountRef} />
            </div>
            {mountHeader ? <IntroHeader animationPlayed={props.animationPlayed}/> : <div/>}
        </div>
    )
}

export default IntroLoadingAnimation;