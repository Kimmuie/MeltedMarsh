import { OrbitControls, useGLTF, PerspectiveCamera } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from 'three';
import ParticleSystem, {
  BoxZone,
  Color,
  CrossZone,
  CustomRenderer,
  Debug,
  Emitter,
  Gravity,
  Life,
  Mass,
  RadialVelocity,
  Radius,
  Rate,
  Rotate,
  Scale,
  Span,
  Vector3D,
  ease,
} from 'three-nebula';

const createDebugger = ({ THREE: three, system, scene, zone }) => {
  Debug.drawZone(three, system, scene, zone);
};

const createZone = () => {
  const zone = new BoxZone(6);
  zone.friction = 0.5;
  zone.max = 1;
  return zone;
};

const createEmitter = zone => {
  const emitter = new Emitter();
  emitter
    .addInitializers([
      new Mass(0.1),
      new Radius(10),
      new Life(2, 4),
      new RadialVelocity(400, new Vector3D(0, 1, 0), 6),
    ])
    .addBehaviours([
      new Rotate('random', 'random'),
      new Scale(1, 0.01),
      new Gravity(1),
      new CrossZone(zone, 'bound'),
      new Color(0xffffff, 'random', Infinity, ease.easeOutQuart),
    ])
    .setPosition({ x: 0, y: 0 })
    .emit();
  return emitter;
};

export const Preview = () => {
  const modelRef = useRef();
  const controlsRef = useRef();
  const { scene, camera, gl } = useThree();
  const gltfScene = useGLTF("/models/preview.glb").scene;
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  const targetPosition = new THREE.Vector3(10, 10, -10);
  const startPosition = new THREE.Vector3(0, 15, -15);
  const lerpFactor = 0.01;

  useEffect(() => {
    const handleMouseDown = () => setIsUserInteracting(true);
    const handleMouseUp = () => setIsUserInteracting(true);

    gl.domElement.addEventListener('mousedown', handleMouseDown);
    gl.domElement.addEventListener('mouseup', handleMouseUp);

    return () => {
      gl.domElement.removeEventListener('mousedown', handleMouseDown);
      gl.domElement.removeEventListener('mouseup', handleMouseUp);
    };
  }, [gl.domElement]);

  useEffect(() => {
    const system = new ParticleSystem();
    const renderer = new CustomRenderer();
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshNormalMaterial()
    );
    const zone = createZone();
    const emitter = createEmitter(zone);

    renderer.onParticleCreated = function(p) {
      p.target = this.targetPool.get(mesh);
      p.target.position.copy(p.position);
      scene.add(p.target);
    };

    renderer.onParticleUpdate = function(p) {
      const scale = p.scale * 1;
      p.target.position.copy(p.position);
      p.target.rotation.set(p.rotation.x, p.rotation.y, p.rotation.z);
      p.target.scale.set(scale, scale, scale);
    };

    system.addEmitter(emitter).addRenderer(renderer);
    createDebugger({ THREE, system, scene, zone });

    const animate = () => {
      system.update();
      requestAnimationFrame(animate);
    };
    animate();
  }, [scene]);

  useFrame(() => {
    if (!isUserInteracting) {
      camera.position.lerp(targetPosition, lerpFactor);
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