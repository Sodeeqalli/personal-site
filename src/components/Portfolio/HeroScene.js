import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents, Environment, Float } from '@react-three/drei'

const Orb = () => {
  const shellRef = useRef(null)
  const ringRef = useRef(null)

  useFrame((state, delta) => {
    if (!shellRef.current || !ringRef.current) return

    shellRef.current.rotation.y += delta * 0.18
    shellRef.current.rotation.x += delta * 0.04
    shellRef.current.rotation.z = state.pointer.x * 0.18

    ringRef.current.rotation.z += delta * 0.16
    ringRef.current.rotation.x = state.pointer.y * 0.22
  })

  return (
    <group>
      <Float speed={1.2} rotationIntensity={0.35} floatIntensity={0.85}>
        <mesh ref={shellRef}>
          <icosahedronGeometry args={[1.15, 4]} />
          <meshPhysicalMaterial
            color='#d1e7d6'
            roughness={0.2}
            metalness={0.1}
            clearcoat={0.9}
            clearcoatRoughness={0.12}
            transmission={0.38}
            ior={1.18}
            thickness={1.2}
          />
        </mesh>
      </Float>

      <mesh ref={ringRef}>
        <torusGeometry args={[1.8, 0.028, 16, 160]} />
        <meshStandardMaterial color='#2f7b57' emissive='#1b4332' emissiveIntensity={0.18} />
      </mesh>

      <mesh rotation={[0, 0, -0.5]}>
        <torusGeometry args={[2.28, 0.02, 16, 220]} />
        <meshBasicMaterial color='#bf8f3d' transparent opacity={0.62} />
      </mesh>
    </group>
  )
}

const HeroScene = () => {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5.6], fov: 38 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      frameloop='always'
    >
      <color attach='background' args={['#000000']} />
      <fog attach='fog' args={['#000000', 8, 16]} />

      <ambientLight intensity={0.55} />
      <directionalLight position={[2.5, 2.4, 3]} intensity={1.15} color='#d8ffe6' />
      <pointLight position={[-2, -1.6, 3]} intensity={0.6} color='#bfae8f' />

      <Orb />
      <Environment preset='city' />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </Canvas>
  )
}

export default HeroScene
