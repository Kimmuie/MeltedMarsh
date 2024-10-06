import { Environment, OrthographicCamera } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import React, { useContext,  useRef, useState, useEffect, useMemo } from "react";
import { CharacterController } from "./CharacterController";
import { dataContext } from '../App';
import { Map } from "./Map";
import { Campfire } from "./Campfire";
import { Chocolate } from "./Chocolate";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from 'three';
import ParticleSystem, {
  CustomRenderer,
  Emitter,
  Force,
  Life,
  Mass,
  PointZone,
  Radius,
  Rate,
  Rotate,
  Scale,
  Span,
} from 'three-nebula';

const cubeColors = [0xff5a00, 0xff9a00, 0xffce00];

export const Experience = () => {
const {gameState , setGameState}  = useContext(dataContext)
let winSFX = new Audio('./audio/winSFX.mp3');
winSFX.volume = gameState.audio.SFX;

const notiWin = () => {
  const win = document.getElementById("winUI");
  winSFX.play();
  win.classList.remove("invisible" , "pop-out");
  win.classList.add("pop-in");
};

  const shadowCameraRef = useRef();
  const [levelData, setLevelData] = useState([]);
  const [selectedMap, setSelectedMap] = useState(null);
  const [selectedLevelIndex, setSelectedLevelIndex] = useState(null);
  const [particleSystem, setParticleSystem] = useState(null);
  const [autoSpin, setAutoSpin] = useState(0);
  const { scene } = useThree();
  const [isChocolateVisible, setIsChocolateVisible] = useState(true);

  const handleChocolateCollision = () => {
    setIsChocolateVisible(false);
    console.log("Chocolate collected!");
  };

  const handleCampfireCollision = () => {
    notiWin();
    if (!gameState.isGameOver){
    setGameState((prevState) => ({
      ...prevState,
      isGameOver: true,
    }))
  }
    console.log("Reached Campfire!");
    console.log(gameState.isGameOver);
  };
  const maps = useMemo(() => ({
    castle_on_hills: {
      scale: 3,
      position: [-6, -8, 0],
      campfirePosition: [0, 1, 0],  
    },
    animal_crossing_map: {
      scale: 20,
      position: [-15, -1, 10],
      campfirePosition: [5, 1, 0], 
    },
    city_scene_tokyo: {
      scale: 0.72,
      position: [0, -1, -3.5],
      campfirePosition: [1, 0, -2], 
    },
    de_dust_2_with_real_light: {
      scale: 0.3,
      position: [-5, -3, 13],
      campfirePosition: [0, 0.5, 0], 
    },
    medieval_fantasy_book: {
      scale: 0.4,
      position: [-4, 0, -6],
      campfirePosition: [-2, 0.2, -3], 
    },
    demo_level: {
      scale: 0.4,
      position: [0, -3, 0],
      campfirePosition: [0, -0.8, -0.5],  
    },
    Level1: {
      scale: 0.2,
      position: [0, -1, 4],
      campfirePosition: [1, 0.83, 5],  
      chocolatePosition: [0, -0.5, 5.2],  
    },
  }), []);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setAutoSpin((prevSpin) => prevSpin + 0.02);
    }, 50);

    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    const storedLevelIndex = localStorage.getItem('selectedLevelIndex');
    if (storedLevelIndex !== null) {
      setSelectedLevelIndex(parseInt(storedLevelIndex, 10));
    }
  }, []);

  useEffect(() => {
    if (selectedLevelIndex !== null) {
      fetch('level.json')
        .then(response => response.json())
        .then(data => {
          setLevelData(data);
          setSelectedMap(data[selectedLevelIndex].mapName);
        })
        .catch(error => console.error('Error fetching the JSON data:', error));
    }
  }, [selectedLevelIndex]);

  //particle
  const createZone = () => {
    return new PointZone(0, 0, 0);
  };

  const createEmitter = (campfirePosition) => {
    const emitter = new Emitter();
    emitter
      .setRate(new Rate(new Span(2, 4), new Span(0.1, 0.2)))
      .addInitializers([
        new Mass(1),
        new Life(1, 2.5),
        new Radius(0.1, 0.3),
      ])
      .addBehaviours([
        new Rotate('random', 'random'),
        new Scale(0.15, 0),
        new Force(0, 0.01, 0),
      ])
      .setPosition({ 
        x: campfirePosition[0] - 0.2, 
        y: campfirePosition[1], 
        z: campfirePosition[2] + 0.02 
      })
      .setRotation(0, 0, 0)
      .emit();
    return emitter;
  };

  const createParticleLight = (campfirePosition) => {
    const light = new THREE.PointLight(0xffffff, 8, 20);
    light.position.set(
      campfirePosition[0] - 0.2,
      campfirePosition[1] + 2.3,
      campfirePosition[2]
    ); 
    light.layers.enable(5); 
    return light;
  };

  useEffect(() => {
    if (selectedMap && maps[selectedMap]) {
      const system = new ParticleSystem();
      const renderer = new CustomRenderer();
      const zone = createZone();
      const emitter = createEmitter(maps[selectedMap].campfirePosition);
      const particleLight = createParticleLight(maps[selectedMap].campfirePosition);
      scene.add(particleLight);

      renderer.onParticleCreated = function(p) {
        const randomColor = cubeColors[Math.floor(Math.random() * cubeColors.length)];
        const mesh = new THREE.Mesh(
          new THREE.BoxGeometry(1, 1, 1),
          new THREE.MeshPhongMaterial({ color: randomColor })
        );
        p.target = mesh;
        p.target.position.copy(p.position);
        scene.add(p.target);
      };

      renderer.onParticleUpdate = function(p) {
        const scale = p.scale * 1;
        p.target.position.copy(p.position);
        p.target.rotation.set(p.rotation.x, p.rotation.y, p.rotation.z);
        p.target.scale.set(scale, scale, scale);
      };

      renderer.onParticleDead = function(p) {
        scene.remove(p.target);
      };

      system.addEmitter(emitter).addRenderer(renderer);

      setParticleSystem(system);

      return () => {
        system.destroy();
        scene.remove(particleLight);
      };
    }
  }, [selectedMap, maps, scene]);

  useFrame(() => {
    if (particleSystem) {
      particleSystem.update();
    }
  });

  return (
    <>
      <Environment preset="sunset" />
      <directionalLight
        intensity={0.65}
        castShadow
        position={[-15, 10, 15]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.00005}
      >
        <OrthographicCamera
          left={-22}
          right={15}
          top={10}
          bottom={-20}
          ref={shadowCameraRef}
          attach={"shadow-camera"}
        />
      </directionalLight>
      {selectedMap && maps[selectedMap] && (
        <Physics key={selectedMap}>
          <Map
            scale={maps[selectedMap].scale}
            position={maps[selectedMap].position}
            model={`models/${selectedMap}.glb`}
          />
          <CharacterController />
          <Campfire 
            position={maps[selectedMap].campfirePosition} 
            onCollision={handleCampfireCollision}
            />
          <Chocolate
            position={maps[selectedMap].chocolatePosition} 
            onCollision={handleChocolateCollision}
            rotation={[0, autoSpin, 0]}
            isVisible={isChocolateVisible}
          />
        </Physics>
      )}
    </>
  );
};