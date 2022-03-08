import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function ParticleGroup() {
  const particleMesh = useRef(null);
  useFrame(() => {
    particleMesh.current.rotation.z = particleMesh.current.rotation.y += 0.002;
  });
  return <group ref={particleMesh}>{Particles()}</group>;
}

function Particles() {
  let result = [];
  for (let i = 0; i < 125; i++) {
    result.push(<Fregment />);
  }
  return result;
}

function Fregment() {
  let scale = getRandomIntInclusive(5, 20) / 300;
  return (
    <mesh
      position={[
        getRandomIntInclusive(-30, 30),
        getRandomIntInclusive(-30, 30),
        getRandomIntInclusive(-30, 30),
      ]}
      scale={[scale, scale, scale]}
    >
      <tetrahedronGeometry args={[2, 0]} />
      <meshPhongMaterial attach="material" color="white" />
    </mesh>
  );
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
} // 랜덤
