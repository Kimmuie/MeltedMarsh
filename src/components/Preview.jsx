import { OrbitControls, useGLTF, PerspectiveCamera } from "@react-three/drei";
import { useRef } from "react";
import { useThree } from "@react-three/fiber";

export const Preview = () => {
  const modelRef = useRef();
  const { scene } = useGLTF("/models/preview.glb");

  return (
    <>
      <OrbitControls />
      <PerspectiveCamera makeDefault position={[5, 5, 5]} />
      
      <ambientLight intensity={3.5} />
      <directionalLight position={[10, 10, 5]} intensity={3} />

      <primitive 
        object={scene} 
        ref={modelRef}
        scale={[0.3, 0.3, 0.3]}
      />

    </>
  );
};

useGLTF.preload("/models/preview.glb");