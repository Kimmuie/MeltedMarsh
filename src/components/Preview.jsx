import { OrbitControls, useGLTF, PerspectiveCamera } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from 'three';
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

// const createDebugger = ({ THREE: three, system, scene, zone }) => {
//   Debug.drawZone(three, system, scene, zone);
// };

const createZone = () => {
  return new PointZone(0, 0, 0);
};

const createEmitter = (zone) => {
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
      new Scale(0.25, 0),
      new Force(0, 0.01, 0),
    ])
    .setPosition({ x: 0, y: 0.3, z: 0 })
    .setRotation(0, 0, 0)
    .emit();
  return emitter;
};

const cubeColors = [0xff5a00, 0xff9a00, 0xffce00];

export const Preview = () => {
  const modelRef = useRef();
  const controlsRef = useRef();
  const { scene, camera, gl } = useThree();
  const gltfScene = useGLTF("/models/preview.glb").scene;
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [particleSystem, setParticleSystem] = useState(null);

  const targetPosition = new THREE.Vector3(10, 10, -10);
  const startPosition = new THREE.Vector3(0, 15, -15);
  const lerpFactor = 0.01;

  useEffect(() => {
    const handleMouseDown = () => setIsUserInteracting(true);
    const handleMouseUp = () => setIsUserInteracting(true);
    const handleMouseScroll = () => setIsUserInteracting(true);

    gl.domElement.addEventListener('mousedown', handleMouseDown);
    gl.domElement.addEventListener('mouseup', handleMouseUp);
    gl.domElement.addEventListener('wheel', handleMouseScroll);

    return () => {
      gl.domElement.removeEventListener('mousedown', handleMouseDown);
      gl.domElement.removeEventListener('mouseup', handleMouseUp);
      gl.addEventListener('wheel', handleMouseScroll);
    };
  }, [gl.domElement]);

  useEffect(() => {
    const system = new ParticleSystem();
    const renderer = new CustomRenderer();
    const zone = createZone();
    const emitter = createEmitter(zone);

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

    // system.addEmitter(emitter).addRenderer(renderer);
    // createDebugger({ THREE, system, scene, zone });

    system.addEmitter(emitter).addRenderer(renderer);

    
    setTimeout(() => {
      setParticleSystem(system);
    }, 2000);

    return () => {
      system.destroy();
    };

  }, [scene]);

  useFrame(() => {
    if (!isUserInteracting) {
      camera.position.lerp(targetPosition, lerpFactor);
      if (modelRef.current) {
        modelRef.current.rotation.y += 0.002;
      }
    }
    if (particleSystem) {
      particleSystem.update();
    }
  });

  return (
    <>
      <OrbitControls ref={controlsRef} />
      <PerspectiveCamera makeDefault position={startPosition.toArray()} />
      
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 10]} intensity={3} />

      <primitive 
        object={gltfScene} 
        ref={modelRef}
        scale={[0.3, 0.3, 0.3]}
      />
    </>
  );
};

useGLTF.preload("/models/preview.glb");