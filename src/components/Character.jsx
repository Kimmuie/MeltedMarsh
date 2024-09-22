import { useAnimations, useGLTF } from "@react-three/drei";
import React, { useEffect, useRef } from "react";

export function Character({ animation, ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/character2.glb");
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    actions[animation]?.reset().fadeIn(0.24).play();
    return () => actions?.[animation]?.fadeOut(0.24);
  }, [animation]);

  useEffect(() => {
    if (materials.Material) {
      materials.Material.color.set("#ff0000"); // Example: Set the material color to red
      materials.Material.metalness = 0.5;      // Example: Set the metalness value
      materials.Material.roughness = 0.8;      // Example: Set the roughness value
    }
  }, [materials]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="fall_guys">
          <primitive object={nodes._rootJoint} />
          <skinnedMesh
            name="body"
            geometry={nodes.body.geometry}
            material={materials.Material}
            // material={materials["Material.001"]}
            skeleton={nodes.body.skeleton}
            castShadow
            receiveShadow
          />
          <skinnedMesh
            name="eye"
            geometry={nodes.eye.geometry}
            material={materials["Material.001"]}
            skeleton={nodes.eye.skeleton}
            castShadow
            receiveShadow
          />
          <skinnedMesh
            name="hand-"
            geometry={nodes["hand-"].geometry}
            material={materials.Material}
            skeleton={nodes["hand-"].skeleton}
            castShadow
            receiveShadow
          />
          <skinnedMesh
            name="leg"
            geometry={nodes.leg.geometry}
            material={materials.Material}
            skeleton={nodes.leg.skeleton}
            castShadow
            receiveShadow
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/character2.glb");
