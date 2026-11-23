import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Stars, Environment, Lightformer } from '@react-three/drei';

const isSmall = () => window.matchMedia('(max-width: 700px)').matches;
const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// How far the hero has been scrolled out of view, 0 at the top and 1 when it has left
const heroProgress = () => Math.min(1, Math.max(0, window.scrollY / window.innerHeight));

function Rig({ small, reduced }) {
  const group = useRef();
  const blob = useRef();
  const knot = useRef();
  const gem = useRef();
  const ring = useRef();

  useFrame(({ pointer, camera }, dt) => {
    const k = Math.min(1, dt * 2.5);
    const p = heroProgress();
    // Whole scene leans toward the mouse for a living, parallax feel
    const g = group.current;
    g.rotation.y += (pointer.x * 0.6 + p * 0.8 - g.rotation.y) * k;
    g.rotation.x += (-pointer.y * 0.4 + p * 0.3 - g.rotation.x) * k;
    // Scrolling flies the camera back and pushes the shapes apart, as if moving through space
    camera.position.z += ((small ? 8 : 6) + p * 5 - camera.position.z) * k;
    camera.position.y += (-p * 1.5 - camera.position.y) * k;
    const spread = 1 + p * 1.2;
    knot.current.position.set(2.6 * spread, 1 + p * 1.5, -1 - p * 2);
    gem.current.position.set(-2.8 * spread, -1.2 - p, -0.5 + p * 1.5);
    blob.current.scale.setScalar(1.7 * (1 - p * 0.25));
    if (!reduced) ring.current.rotation.z += dt * 0.15;
  });

  return (
    <group ref={group} position={small ? [1.4, 2.6, -2.5] : [1.3, 0, 0]}>
      <Float speed={reduced ? 0 : 2} floatIntensity={1.5}>
        <mesh ref={blob} scale={1.7}>
          <icosahedronGeometry args={[1, small ? 12 : 24]} />
          <MeshDistortMaterial color="#6d5dfc" distort={0.45} speed={reduced ? 0 : 2.5} roughness={0.1} metalness={0.8} />
        </mesh>
      </Float>
      {/* Thin tilted ring around the blob gives the scene a sense of orbit and depth */}
      <mesh ref={ring} rotation={[1.2, 0.2, 0]} scale={2.9}>
        <torusGeometry args={[1, 0.008, 8, 128]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.45} />
      </mesh>
      <Float speed={reduced ? 0 : 3} rotationIntensity={2}>
        <mesh ref={knot} position={[2.6, 1, -1]} scale={0.55}>
          <torusKnotGeometry args={[1, 0.3, small ? 96 : 160, small ? 12 : 24]} />
          <meshStandardMaterial color="#00e5ff" wireframe />
        </mesh>
      </Float>
      <Float speed={reduced ? 0 : 2.4} rotationIntensity={3}>
        <mesh ref={gem} position={[-2.8, -1.2, -0.5]} scale={0.7}>
          <octahedronGeometry args={[1]} />
          <meshStandardMaterial color="#ff3d9a" metalness={0.9} roughness={0.15} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Scene3D() {
  const wrap = useRef();
  const [visible, setVisible] = useState(true);
  const [small] = useState(isSmall);
  const [reduced] = useState(prefersReduced);

  // Stop rendering once the hero is off screen to save battery and CPU
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} style={{ position: 'absolute', inset: 0 }}>
      <Canvas
        camera={{ position: [0, 0, small ? 8 : 6], fov: 50 }}
        dpr={small ? [1, 1.5] : [1, 2]}
        frameloop={visible ? 'always' : 'never'}
        gl={{ antialias: !small, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={60} color="#00e5ff" />
        <pointLight position={[-5, -3, 3]} intensity={40} color="#ff3d9a" />
        <Stars radius={60} depth={40} count={small ? 900 : 2500} factor={3} fade speed={reduced ? 0 : 1} />
        <Rig small={small} reduced={reduced} />
        {/* Reflections built in code, so nothing is downloaded from a third-party CDN */}
        <Environment resolution={small ? 64 : 256}>
          <color attach="background" args={['#221c55']} />
          <Lightformer form="circle" intensity={2.5} color="#ffffff" position={[0, 7, 3]} scale={10} />
          <Lightformer form="circle" intensity={3} color="#00e5ff" position={[6, 2, 4]} scale={6} />
          <Lightformer form="circle" intensity={3} color="#ff3d9a" position={[-7, -2, 3]} scale={7} />
          <Lightformer form="circle" intensity={1.5} color="#8f7dff" position={[0, -6, -2]} scale={12} />
        </Environment>
      </Canvas>
    </div>
  );
}
