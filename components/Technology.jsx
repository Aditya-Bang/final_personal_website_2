import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";

const technologies = [
    {
      name: "HTML 5",
      icon: "html",
    },
    {
        name: "Tensorflow",
        icon: "tensorflow"
    },
    {
      name: "CSS 3",
      icon: "css",
    },
    {
      name: "JavaScript",
      icon: "javascript",
    },
    {
      name: "TypeScript",
      icon: "typescript",
    },
    {
      name: "React JS",
      icon: "reactjs",
    },
    {
      name: "Redux Toolkit",
      icon: "redux",
    },
    {
      name: "Tailwind CSS",
      icon: "tailwind",
    },
    {
      name: "Node JS",
      icon: "nodejs",
    },
    {
      name: "MongoDB",
      icon: "mongodb",
    },
    {
      name: "Git",
      icon: "git",
    },
    {
      name: "Figma",
      icon: "figma",
    },
    {
        name: "ThreeJS",
        icon: "threejs"
    },
    {
      name: "Docker",
      icon: "docker",
    },
  ];

// import CanvasLoader from "../Loader";
// fallback={<CanvasLoader />}

const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color='#fff8eb'
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }) => {
  return (
    <Canvas
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense >
        <OrbitControls enableZoom={false} />
        <Ball imgUrl={icon} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

const Technology = () => {
    return (
      <div className='flex flex-row flex-wrap justify-center items-center gap-2'>
        {technologies.map((technology) => (
          <div className=' flex flex-col justify-center items-center p-2 text-white' key={technology.name}>
            {technology.name}
            <BallCanvas icon={`/tech/${technology.icon}.png`} />
          </div>
        ))}
      </div>
    );
  };

export default Technology;