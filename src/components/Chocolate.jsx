import React, { useRef } from 'react';
import { useGLTF } from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier";

export function Chocolate({ scale = [0.025, 0.18, 0.09], position, onCollision, isVisible = true, ...props }) {
  const { nodes, materials } = useGLTF("/models/chocolate.glb");
  const rigidBodyRef = useRef();

  const handleCollision = () => {
    if (rigidBodyRef.current) {
      rigidBodyRef.current.setEnabled(false);
    }
    onCollision();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <RigidBody 
      type="fixed" 
      colliders={false} 
      position={position} 
      ref={rigidBodyRef}
      onCollisionEnter={handleCollision}
    >
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
      <CuboidCollider args={[0.025, 0.18, 0.09]} />
    </RigidBody>
  );
}

useGLTF.preload("/models/chocolate.glb");