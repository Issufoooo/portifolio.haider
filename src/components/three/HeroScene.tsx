import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { heroState } from '@/lib/scroll';

// ============================================================
// REACT THREE FIBER — Hero
// O logótipo (2×2 quadrados) em 3D. Reage a:
//   • rato      → inclina o conjunto (heroState.pointerX/Y)
//   • scroll    → os cubos "desmontam-se" (heroState.scroll, do GSAP)
// Nada disto passa por estado do React: tudo é lido no useFrame.
// ============================================================

type CubeDef = { base: [number, number]; bright: boolean; phase: number; depth: number };

const STEP = 1.12;
const CUBES: CubeDef[] = [
  { base: [-STEP / 2, STEP / 2], bright: true, phase: 0, depth: 0.9 },
  { base: [STEP / 2, STEP / 2], bright: false, phase: 1.6, depth: -0.6 },
  { base: [-STEP / 2, -STEP / 2], bright: false, phase: 3.1, depth: -0.9 },
  { base: [STEP / 2, -STEP / 2], bright: true, phase: 4.4, depth: 0.7 },
];

function Cube({ def, geometry, edges }: { def: CubeDef; geometry: THREE.BufferGeometry; edges: THREE.BufferGeometry }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    const g = ref.current;
    if (!g) return;
    const t = state.clock.elapsedTime + def.phase;
    const s = heroState.scroll; // 0 → 1
    const spread = 1 + s * 1.6;
    g.position.x = def.base[0] * spread;
    g.position.y = def.base[1] * spread + Math.sin(t * 0.9) * 0.06;
    g.position.z = def.depth * s * 1.6 + Math.cos(t * 0.7) * 0.05;
    g.rotation.x = Math.sin(t * 0.5) * 0.08 + s * 1.1 * (def.bright ? 1 : -1);
    g.rotation.y = Math.cos(t * 0.45) * 0.08 + s * 1.4;
  });

  return (
    <group ref={ref}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color={def.bright ? '#3B82F6' : '#102042'}
          roughness={def.bright ? 0.28 : 0.4}
          metalness={def.bright ? 0.15 : 0.35}
          emissive={def.bright ? '#1D4ED8' : '#60A5FA'}
          emissiveIntensity={def.bright ? 0.32 : 0.07}
        />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#93C5FD" transparent opacity={def.bright ? 0.35 : 0.6} />
      </lineSegments>
    </group>
  );
}

function Logo3D() {
  const group = useRef<THREE.Group>(null);
  const viewport = useThree((s) => s.viewport);
  // Em ecrãs largos o logótipo fica à direita, por trás dos CTAs, para
  // não competir com o título; em ecrãs mais "quadrados" fica ao centro.
  const wide = viewport.width / viewport.height > 1.45;
  const scale = Math.min(0.62, viewport.height / 6.4);
  const offsetX = wide ? viewport.width * 0.3 : 0;
  const offsetY = wide ? -viewport.height * 0.06 : -viewport.height * 0.22;
  const geometry = useMemo(() => new RoundedBoxGeometry(1, 1, 1, 5, 0.14), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry, 40), [geometry]);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const targetY = heroState.pointerX * 0.55 + 0.35;
    const targetX = -heroState.pointerY * 0.4 - 0.15;
    const k = 1 - Math.pow(0.001, delta); // suavização independente do FPS
    g.rotation.y += (targetY - g.rotation.y) * k;
    g.rotation.x += (targetX - g.rotation.x) * k;
  });

  return (
    <group position={[offsetX, offsetY, -1.2]} scale={scale}>
      <group ref={group}>
        {CUBES.map((c, i) => (
          <Cube key={i} def={c} geometry={geometry} edges={edges} />
        ))}
      </group>
    </group>
  );
}

const HeroScene: React.FC<{ active: boolean; onReady?: () => void }> = ({ active, onReady }) => (
  <Canvas
    flat
    dpr={[1, 1.75]}
    frameloop={active ? 'always' : 'never'}
    camera={{ position: [0, 0, 7.2], fov: 32 }}
    gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    style={{ pointerEvents: 'none' }}
    onCreated={() => onReady?.()}
  >
    <ambientLight intensity={0.9} />
    <directionalLight position={[3.5, 4, 5]} intensity={2.4} color="#DBEAFE" />
    <directionalLight position={[-4, -2, 3]} intensity={1.1} color="#3B82F6" />
    <Logo3D />
  </Canvas>
);

export default HeroScene;
