import { useGLTF } from "@react-three/drei";
import React, { useEffect, useRef } from "react";

export function Chocolate({ scale = [0.025, 0.18, 0.09], ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/models/chocolate.glb");

  return (
    <group {...props} scale={scale}>
      <group name="Scene">
        {Object.keys(nodes).map((nodeName) => (
          <mesh
            key={nodeName}
            geometry={nodes[nodeName].geometry}
            material={nodes[nodeName].material}
          />
        ))}
      </group>
    </group>
  );
}

useGLTF.preload("/models/chocolate.glb");