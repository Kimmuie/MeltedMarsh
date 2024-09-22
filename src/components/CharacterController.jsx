import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { MathUtils, Vector3 } from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import { Character } from "./Character";

const normalizeAngle = (angle) => {
  while (angle > Math.PI) angle -= 2 * Math.PI;
  while (angle < -Math.PI) angle += 2 * Math.PI;
  return angle;
};

const lerpAngle = (start, end, t) => {
  start = normalizeAngle(start);
  end = normalizeAngle(end);

  if (Math.abs(end - start) > Math.PI) {
    if (end > start) {
      start += 2 * Math.PI;
    } else {
      end += 2 * Math.PI;
    }
  }

  return normalizeAngle(start + (end - start) * t);
};

export const CharacterController = () => {
  const WALK_SPEED = 0.8; // Hardcoded walk speed
  const RUN_SPEED = 1.8; // Hardcoded run speed
  const JUMP_FORCE = 5; 
  const ROTATION_SPEED = degToRad(1); // Hardcoded rotation speed

  const rb = useRef();
  const container = useRef();
  const character = useRef();

  const [animation, setAnimation] = useState("idle");

  const characterRotationTarget = useRef(0);
  const characterJump = useRef(0);
  const rotationTarget = useRef(0);
  const cameraTarget = useRef();
  const cameraPosition = useRef();
  const cameraWorldPosition = useRef(new Vector3());
  const cameraLookAtWorldPosition = useRef(new Vector3());
  const cameraLookAt = useRef(new Vector3());
  const [, get] = useKeyboardControls();
  const isPanning = useRef(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => 
    {
      const onMouseDown = (event) => {
        if (event.button === 0) { // Left-click
          isPanning.current = true;
        }
      };
  
      const onMouseUp = () => {
        isPanning.current = false;
      };
  
      const onMouseMove = (event) => {
        if (isPanning.current) {
          rotationTarget.current += event.movementX * 0.005; 
          camera.position.y -= event.movementY * 0.005;
        }
      };

      const onWheel = (event) => {
        setZoomLevel((prev) => MathUtils.clamp(prev + event.deltaY * 0.001, 0.5, 1)); 
      };

      window.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('wheel', onWheel);
  
      return () => {
        window.removeEventListener('mousedown', onMouseDown);
        window.removeEventListener('mouseup', onMouseUp);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('wheel', onWheel);
      };
    }, []);

  
  useFrame(({ camera, mouse }) => {
    if (rb.current) {
      const vel = rb.current.linvel();

      const movement = {
        x: 0,
        y: 0,
        z: 0,
      };

      if (get().forward) {
        movement.z = 1;
      }
      if (get().backward) {
        movement.z = -1;
      }

      let speed = get().run ? RUN_SPEED : WALK_SPEED;

      if (get().left) {
        movement.x = 1;
      }
      if (get().right) {
        movement.x = -1;
      }
      
      const isGrounded = Math.abs(vel.y) < 0.01; // Check if the character is grounded
      const isWalkable = Math.abs(vel.y) < 0.3; // Check if the character is grounded
      if (get().jump && isGrounded) {
        movement.y = JUMP_FORCE; // Apply jump velocity only when grounded
        console.log(movement.y)
      }

      if (movement.x !== 0) {
        rotationTarget.current += ROTATION_SPEED * movement.x;
      }
      if (movement.y !== 0){
        characterJump.current = movement.y;
        vel.y = characterJump.current;  
      }
      if (movement.x !== 0 || movement.z !== 0) {
        characterRotationTarget.current = Math.atan2(movement.x, movement.z);
        vel.x =
          Math.sin(rotationTarget.current + characterRotationTarget.current) *
          speed;
        vel.z =
          Math.cos(rotationTarget.current + characterRotationTarget.current) *
          speed;
        if (movement.y !== 0){
          setAnimation("dive");
        } else if (isWalkable && speed === WALK_SPEED){
          setAnimation("walk");
        } else if (isWalkable && speed === RUN_SPEED) {
          setAnimation("run");
        }
      } else if (movement.y > 0 && speed != 0 ){
        setAnimation("dive");
      } else {
        setAnimation("idle");
      }
      character.current.rotation.y = lerpAngle(
        character.current.rotation.y,
        characterRotationTarget.current,
        0.1
      );

      rb.current.setLinvel(vel, true);
    }

    // CAMERA
    container.current.rotation.y = MathUtils.lerp(
      container.current.rotation.y,
      rotationTarget.current,
      0.1
    );

    cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
    camera.position.lerp(cameraWorldPosition.current, 0.1);

    // Apply zoom
    camera.zoom = MathUtils.lerp(camera.zoom, zoomLevel, 0.1);
    camera.updateProjectionMatrix();

    if (cameraTarget.current) {
      cameraTarget.current.getWorldPosition(cameraLookAtWorldPosition.current);
      cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 0.1);

      camera.lookAt(cameraLookAt.current);
    }
  });

  return (
    <RigidBody colliders={false} lockRotations ref={rb}>
      <group ref={container}>
        <group ref={cameraTarget} position-z={1.5} />
        <group ref={cameraPosition} position-y={2} position-z={-2} />
        <group ref={character}>
          <Character scale={0.18} position-y={-0.25} animation={animation} />
        </group>
      </group>
      <CapsuleCollider args={[0.08, 0.15]} />
    </RigidBody>
  );
};
