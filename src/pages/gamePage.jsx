import { useState, useEffect, useRef } from 'react';
import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Experience } from "../components/Experience";
import { Cutscene } from '../components/cutscene';
import { NotiEsc } from '../components/notiEsc';
import { NotiGuide } from '../components/notiGuide';
import { NotiSetting } from '../components/notiSetting';
import { NotiLose } from '../components/notiLose';
import { Game } from '../components/sectionGame';

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "run", keys: ["Shift"] },
  { name: "jump", keys: ["Space"] },
];

export function GamePage() {
  useEffect(() => {
    const cutscene = document.getElementById("cutscene");
    if (cutscene) {
      cutscene.classList.remove("outscene");
      cutscene.classList.add("inscene");
      
      const timer = setTimeout(() => {
        cutscene.classList.remove("inscene");
        cutscene.classList.add("outscene", "popdown2");
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <KeyboardControls map={keyboardMap}>
      <Cutscene id="cutscene" />
      <NotiLose/>
      <NotiEsc/>
      <NotiGuide/>
      <NotiSetting/>
      <Game/>
      <Canvas
        shadows
        camera={{ position: [3, 3, 3], near: 0.1, fov: 50 }}
        style={{
          touchAction: "none",
        }}
      >
        <color attach="background" args={["#a8def0"]} />
        <Experience />
      </Canvas>
    </KeyboardControls>
  );
}