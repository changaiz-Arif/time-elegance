import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Mesh, Group } from "three";

function WatchModel({ autoRotate = true, color = "#3b5bdb" }: { autoRotate?: boolean; color?: string }) {
  const group = useRef<Group>(null);
  const secondHand = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (autoRotate && group.current) group.current.rotation.y += delta * 0.4;
    if (secondHand.current) secondHand.current.rotation.z -= delta * 0.6;
  });
  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* Case */}
      <mesh castShadow>
        <cylinderGeometry args={[1.05, 1.05, 0.28, 64]} />
        <meshStandardMaterial color="#c9ccd4" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Bezel */}
      <mesh position={[0, 0.145, 0]}>
        <torusGeometry args={[1.0, 0.09, 24, 64]} />
        <meshStandardMaterial color="#e6e8ee" metalness={0.95} roughness={0.15} />
      </mesh>
      {/* Dial */}
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.92, 0.92, 0.02, 64]} />
        <meshStandardMaterial color={color} metalness={0.4} roughness={0.35} />
      </mesh>
      {/* Hour markers */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.sin(a) * 0.78, 0.175, Math.cos(a) * 0.78]}>
            <boxGeometry args={[0.05, 0.02, 0.12]} />
            <meshStandardMaterial color="#f7f7fa" metalness={0.7} roughness={0.3} />
          </mesh>
        );
      })}
      {/* Hour hand */}
      <mesh position={[0, 0.185, 0.22]}>
        <boxGeometry args={[0.05, 0.01, 0.5]} />
        <meshStandardMaterial color="#ffffff" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Minute hand */}
      <mesh position={[0.15, 0.19, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.04, 0.01, 0.7]} />
        <meshStandardMaterial color="#ffffff" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Second hand */}
      <mesh ref={secondHand} position={[0, 0.2, 0]}>
        <boxGeometry args={[0.01, 0.005, 0.8]} />
        <meshStandardMaterial color="#ff5252" />
      </mesh>
      {/* Center */}
      <mesh position={[0, 0.21, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.03, 32]} />
        <meshStandardMaterial color="#f7f7fa" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Crown */}
      <mesh position={[1.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 0.15, 24]} />
        <meshStandardMaterial color="#c9ccd4" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

export function WatchViewer3D({ interactive = false, color }: { interactive?: boolean; color?: string }) {
  return (
    <Canvas shadows camera={{ position: [0, 1.4, 3.2], fov: 40 }} dpr={[1, 2]}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
      <Suspense fallback={null}>
        <WatchModel autoRotate={!interactive} color={color} />
        <ContactShadows position={[0, -0.6, 0]} opacity={0.35} scale={4} blur={2.5} far={2} />
        <Environment preset="studio" />
      </Suspense>
      {interactive && <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 2} />}
    </Canvas>
  );
}