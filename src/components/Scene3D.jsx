import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Stars, Environment } from '@react-three/drei';

function Rig() {
  const group = useRef();
  // Whole scene leans toward the mouse for a living, parallax feel
  useFrame(({ pointer }, dt) => {
    group.current.rotation.y += (pointer.x * 0.6 - group.current.rotation.y) * dt * 2;
    group.current.rotation.x += (-pointer.y * 0.4 - group.current.rotation.x) * dt * 2;
  });
  return (
    <group ref={group}>
      <Float speed={2} floatIntensity={1.5}>
        <mesh scale={1.7}>
          <icosahedronGeometry args={[1, 24]} />
          <MeshDistortMaterial color="#6d5dfc" distort={0.45} speed={2.5} roughness={0.1} metalness={0.8} />
        </mesh>
      </Float>
      <Float speed={3} rotationIntensity={2}>
        <mesh position={[2.6, 1, -1]} scale={0.55}>
          <torusKnotGeometry args={[1, 0.3, 160, 24]} />
          <meshStandardMaterial color="#00e5ff" wireframe />
        </mesh>
      </Float>
      <Float speed={2.4} rotationIntensity={3}>
        <mesh position={[-2.8, -1.2, -0.5]} scale={0.7}>
          <octahedronGeometry args={[1]} />
          <meshStandardMaterial color="#ff3d9a" metalness={0.9} roughness={0.15} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={60} color="#00e5ff" />
      <pointLight position={[-5, -3, 3]} intensity={40} color="#ff3d9a" />
      <Stars radius={60} depth={40} count={2500} factor={3} fade speed={1} />
      <Rig />
      <Environment preset="city" />
    </Canvas>
  );
}
