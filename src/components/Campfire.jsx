import React, { useRef } from 'react';
import { useGLTF } from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier";

export function Campfire({ scale = [0.06, 0.06, 0.06], position, onCollision, ...props }) {
  const { nodes, materials } = useGLTF("/models/campfire.glb");
  const rigidBodyRef = useRef();

  const handleCollision = () => {
    if (rigidBodyRef.current) {
      rigidBodyRef.current.setEnabled(false);
    }
    onCollision();
  };

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
      <CuboidCollider args={[0.06, 0.06, 0.06]} />
    </RigidBody>
  );
}

useGLTF.preload("/models/campfire.glb");