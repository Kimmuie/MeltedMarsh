import { Environment, OrthographicCamera } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { useRef, useState, useEffect } from "react";
import { CharacterController } from "./CharacterController";
import { Map } from "./Map";
import { Campfire } from "./Campfire";
import ParticleSystem, {
  CustomRenderer,
  Debug,
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

export const Experience = () => {
  const shadowCameraRef = useRef();
  const [levelData, setLevelData] = useState([]);
  const [selectedMap, setSelectedMap] = useState(null);
  const [selectedLevelIndex, setSelectedLevelIndex] = useState(null);

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

  const maps = {
    castle_on_hills: {
      scale: 3,
      position: [-6, -8, 0],
      campfirePosition: [0, 1, 0],  // Adjusted height for visibility
    },
    animal_crossing_map: {
      scale: 20,
      position: [-15, -1, 10],
      campfirePosition: [5, 1, 0],  // Adjusted position
    },
    city_scene_tokyo: {
      scale: 0.72,
      position: [0, -1, -3.5],
      campfirePosition: [1, 0, -2],  // Adjusted to be in view
    },
    de_dust_2_with_real_light: {
      scale: 0.3,
      position: [-5, -3, 13],
      campfirePosition: [0, 0.5, 0], // Adjusted for height
    },
    medieval_fantasy_book: {
      scale: 0.4,
      position: [-4, 0, -6],
      campfirePosition: [-2, 0.2, -3],  // Adjusted positioning
    },
    demo_level: {
      scale: 0.4,
      position: [0, -3, 0],
      campfirePosition: [0, -0.8, -0.5],  // Adjusted height for visibility
    },
  };
  

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
      {selectedMap && (
        <Physics key={selectedMap}>
          <Map
            scale={maps[selectedMap].scale}
            position={maps[selectedMap].position}
            model={`models/${selectedMap}.glb`}
          />
          <CharacterController />
          <Campfire position={maps[selectedMap].campfirePosition} />

        </Physics>
      )}
    </>
  );
};