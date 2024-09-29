import { useAnimations, useGLTF } from "@react-three/drei";
import React, { useEffect, useRef } from "react";

export function Character({ animation, currentModel, ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/character1.glb");
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    actions[animation]?.reset().fadeIn(0.24).play();
    return () => actions?.[animation]?.fadeOut(0.24);
  }, [animation]);

  useEffect(() => {
    if (materials.Material) {
      materials.Material.color.set("#ff0000");
      materials.Material.metalness = 0.5;     
      materials.Material.roughness = 0.8;     
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
            material={materials["White"]}
            skeleton={nodes.body.skeleton}
            castShadow
            receiveShadow
          />
          <skinnedMesh
            name="eye"
            geometry={nodes.eye.geometry}
            material={materials["Black.002"]}
            skeleton={nodes.eye.skeleton}
            castShadow
            receiveShadow
          />
          <skinnedMesh
            name="hand-"
            geometry={nodes["hand-"].geometry}
            material={materials["White"]}
            skeleton={nodes["hand-"].skeleton}
            castShadow
            receiveShadow
          />
          <skinnedMesh
            name="leg"
            geometry={nodes.leg.geometry}
            material={materials["White"]}
            skeleton={nodes.leg.skeleton}
            castShadow
            receiveShadow
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/character1.glb");
