import { useGLTF } from "@react-three/drei";
import React, { useEffect, useRef } from "react";

export function Campfire({ position = [0, 0, 0], scale = [0.1,0.1,0.1], ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/models/campfire.glb");
  

  return (
    <group ref={group} {...props} position={position} scale={scale} dispose={null}>
    <group name="Scene">
      {/* Try rendering both Cube and Cube008 to find the campfire */}
      {nodes?.Rock && (
        <mesh
          name="campfire"
          geometry={nodes.Rock.geometry}
          material={materials["Material.001"]}
        />
      )}
      {nodes?.Wood && (
        <mesh
          name="campfire"
          geometry={nodes.Wood.geometry}
          material={materials["Material.002"]}
        />
      )}
    </group>
  </group>
  );
}

useGLTF.preload("/models/campfire.glb");